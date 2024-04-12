<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      id="tide-address-lookup"
      :inputLabel="label"
      :showLabel="true"
      variant="reverse"
      :submitLabel="false"
      :inputValue="inputValue"
      :suggestions="results"
      :showNoResults="true"
      :debounce="5000"
      :maxSuggestionsDisplayed="8"
      :placeholder="placeholder"
      :getOptionId="(itm:any) => itm?.id || itm?.name"
      :getSuggestionVal="(itm:any) => itm?.name || ''"
      :isFreeText="false"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option?.name }}</span>

        <component
          :is="tagsComponent"
          v-if="tagsComponent"
          :option="option"
        ></component>
        <RplTag
          v-else-if="option?.postcode"
          :label="option?.postcode"
          variant="dark"
          class="rpl-u-margin-l-3"
        />
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, inject, watch, toRaw } from 'vue'
import { ref, getSingleResultValue } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { transformExtent } from 'ol/proj'
import { Extent } from 'ol/extent'
import { fitExtent, fitVictoria } from '@dpc-sdp/ripple-ui-maps'
// TODO must add analytics events
// import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  inputValue?: any
  resultsloaded?: boolean
  suggestionsIndex?: string
  controlMapZooming?: boolean
  label?: string
  placeholder?: string
  tagsComponent?: string
  mapResultsFnName?: string
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null,
  resultsloaded: false,
  suggestionsIndex: 'vic-postcode-localities',
  controlMapZooming: true,
  label: 'Search by postcode or suburb',
  placeholder: 'Enter postcode or suburb',
  tagsComponent: undefined,
  mapResultsFnName: ''
})

const results = ref([])

type addressResultType = {
  name: string
  postcode: string
  bbox: string[]
  type: 'postcode' | 'locality'
}

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()

const appConfig = useAppConfig()
const { rplMapRef, deadSpace } = inject('rplMapInstance')

const pendingZoomAnimation = ref(false)

async function submitAction(e: any) {
  const item = e.value

  // The search bar component sometimes returns a string, sometimes an object, we just ignore the non-empty strings
  if (item && typeof item === 'string') {
    return
  }

  emit('update', item || null)

  // Because this was a user initiated action, we want to animate the zoom
  pendingZoomAnimation.value = true
}

const fetchSuggestions = async (query: string) => {
  const searchUrl = `/api/tide/app-search/${props.suggestionsIndex}/elasticsearch/_search`
  const queryDSL = {
    query: {
      bool: {
        should: [
          {
            match: {
              name: {
                query,
                operator: 'and'
              }
            }
          },
          {
            prefix: {
              name: {
                value: query,
                case_insensitive: true
              }
            }
          },
          {
            term: {
              postcode: {
                value: query
              }
            }
          }
        ]
      }
    }
  }

  try {
    const response = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL,
        size: 20
      }
    })

    let mappingFn = (itm: any) => {
      const center = getSingleResultValue(itm._source.center)?.split(',')

      return {
        id: itm._id,
        name: getSingleResultValue(itm._source.name),
        postcode: getSingleResultValue(itm._source.postcode),
        bbox: itm._source.bbox,
        center: center?.length === 2 ? [center[1], center[0]] : undefined
      }
    }

    const fns: Record<string, (item: any) => any> =
      appConfig?.ripple?.search?.locationSuggestionMappingFunctions || {}

    // If no transform function is defined, return an empty array
    if (props.mapResultsFnName) {
      const transformFn = fns[props.mapResultsFnName]

      if (typeof transformFn !== 'function') {
        throw new Error(
          `Search listing: No matching location transform function called "${props.mapResultsFnName}"`
        )
      }

      mappingFn = transformFn
    }

    if (response && response.hits.total.value > 0) {
      return response.hits.hits.map(mappingFn)
    }
  } catch (e) {
    console.error(e)
  }
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  if (!q) {
    results.value = []
    return
  }

  // If the query is not a string, then a value has been selected from the dropdown
  // and we shouldn't try to fetch suggestions
  if (typeof q !== 'string') {
    return
  }

  const res = await fetchSuggestions(q)
  if (!res || res.length === 0) {
    results.value = []
  } else {
    results.value = res
  }
}, 300)

// Center the map on the location when the map instance is ready
// this is for tab switching only
watch(
  () => rplMapRef.value,
  (newVal, oldVal) => {
    if (!oldVal && newVal && props.resultsloaded) {
      // We don't animate the zoom here, because it's the initial load or a tab change
      centerMapOnLocation(newVal, props.inputValue, false)
    }
  }
)
// we also watch for the map search results to be loaded before centering
// this is for first load
watch(
  () => props.resultsloaded,
  (newVal, oldVal) => {
    if (!oldVal && newVal && rplMapRef.value) {
      centerMapOnLocation(rplMapRef.value, props.inputValue, false)
    }
  }
)

// Center the map on the location when the location changes
// We look for the value of pendingZoomAnimation to determine if we should animate the zoom
watch(
  () => props.inputValue?.id,
  async () => {
    await nextTick()
    centerMapOnLocation(
      rplMapRef.value,
      props.inputValue,
      pendingZoomAnimation.value
    )
    pendingZoomAnimation.value = false
  }
)

async function centerMapOnLocation(
  map: any,
  location: addressResultType,
  animate: boolean
) {
  if (!props.controlMapZooming) {
    return
  }

  if (map && location?.bbox) {
    // fetch the geometry of the postcode so we can zoom to its extent
    if (location?.bbox) {
      const bbox: Extent = transformExtent(
        location.bbox.map((val) => parseFloat(val)),
        'EPSG:4326',
        'EPSG:3857'
      )

      fitExtent(map, bbox, deadSpace.value, {
        padding: 100,
        animationDuration: animate ? 800 : 0
      })
    }
  } else if (!location?.postcode) {
    // reset back to initial view on empty query
    fitVictoria(map, deadSpace.value)
  }
}
</script>
