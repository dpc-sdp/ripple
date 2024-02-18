<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      id="tide-address-lookup"
      inputLabel="Search by postcode or suburb"
      :showLabel="true"
      variant="reverse"
      :submitLabel="false"
      :inputValue="inputValue"
      :suggestions="results"
      :showNoResults="true"
      :debounce="5000"
      :maxSuggestionsDisplayed="8"
      placeholder="Search by postcode or suburb"
      :getOptionId="(itm:any) => itm.name"
      :getSuggestionVal="(itm:any) => itm?.name || ''"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option?.name }}</span>
        <RplTag
          v-if="option?.postcode"
          :label="option?.postcode"
          variant="dark"
          class="rpl-u-margin-l-3"
        />
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { inAndOut } from 'ol/easing'
import { fromLonLat } from 'ol/proj'
import { Extent } from 'ol/extent'
// TODO must add analytics events
// import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  inputValue?: any
  resultsloaded?: boolean
  suggestionsIndex?: string
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null,
  resultsloaded: false,
  suggestionsIndex: 'vic-postcode-localities'
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

const { rplMapRef } = inject('rplMapInstance')

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
              locality: {
                query,
                operator: 'and'
              }
            }
          },
          {
            prefix: {
              locality: {
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
    if (response && response.hits.total.value > 0) {
      return response.hits.hits.map((itm: any) => {
        return {
          name: itm._source.locality,
          postcode: itm._source.postcode,
          bbox: itm._source.bbox,
          center: itm._source.center?.split(',') || undefined
        }
      })
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
  () => props.inputValue,
  (newLocation) => {
    centerMapOnLocation(
      rplMapRef.value,
      newLocation,
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
  if (map && location?.bbox) {
    // fetch the geometry of the postcode so we can zoom to its extent
    if (location?.bbox) {
      const topLeft = fromLonLat(
        [parseFloat(location.bbox[0]), parseFloat(location.bbox[1])],
        'EPSG:3857'
      )
      const bottomRight = fromLonLat(
        [parseFloat(location.bbox[2]), parseFloat(location.bbox[3])],
        'EPSG:3857'
      )
      const bbox: Extent = [
        topLeft[0],
        topLeft[1],
        bottomRight[0],
        bottomRight[1]
      ]
      const mapSize = map.getSize()
      if (mapSize) {
        map.getView().fit(bbox, {
          size: mapSize,
          easing: inAndOut,
          duration: animate ? 800 : 0,
          padding: [100, 100, 100, 100]
        })
      }
    }
  } else if (!location?.postcode) {
    // reset back to initial view on empty query
    const center = [144.9631, -36.8136]
    const initialZoom = 7.3
    map.getView().animate({
      center: fromLonLat(center),
      duration: 1200,
      zoom: initialZoom
    })
  }
}
</script>
