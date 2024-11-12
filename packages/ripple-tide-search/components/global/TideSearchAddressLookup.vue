<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      id="tide-address-lookup"
      :inputLabel="label"
      :showLabel="true"
      variant="reverse"
      :submitLabel="false"
      :inputValue="
        inputValue?.useGeolocation ? userGeolocation || null : inputValue
      "
      :suggestions="results"
      :showNoResults="true"
      :maxSuggestionsDisplayed="8"
      :placeholder="placeholder"
      :getOptionId="(itm: any) => itm?.id || itm?.name"
      :getSuggestionVal="(itm: any) => itm?.name || ''"
      :getOptionLabel="(itm: any) => itm?.name || ''"
      :isBusy="isGettingLocation"
      :isFreeText="false"
      :submitOnClear="true"
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
        <RplTag
          v-else-if="option?.tag"
          :label="option?.tag"
          variant="dark"
          class="rpl-u-margin-l-3"
        />
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { transformExtent, fromLonLat } from 'ol/proj'
import { Extent } from 'ol/extent'
import { addressResultType } from '../../types'
// TODO must add analytics events
// import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  inputValue?: any
  resultsloaded?: boolean
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsIndex?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsKey?: string
  controlMapZooming?: boolean
  label?: string
  placeholder?: string
  tagsComponent?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  mapResultsFnName?: string
  isGettingLocation?: boolean
  userGeolocation: any
  suggestionsConfig: {
    function: string
    args: Record<string, any>
  }
  onLocationSelectOverrideFn?: string | null
  bboxZoomPadding?: number
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null,
  resultsloaded: false,
  suggestionsIndex: 'vic-postcode-localities',
  suggestionsKey: 'name',
  controlMapZooming: true,
  label: 'Search by postcode or suburb',
  placeholder: 'Enter postcode or suburb',
  tagsComponent: undefined,
  mapResultsFnName: '',
  isGettingLocation: false,
  userGeolocation: null,
  onLocationSelectOverrideFn: null,
  bboxZoomPadding: 100
})

const results = ref([])

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()

const { rplMapRef, popup, deadSpace, defaultExtent } = inject('rplMapInstance')

const pendingZoomAnimation = ref(false)

async function submitAction(e: any) {
  const item = e.payload

  // The search bar component sometimes returns a string, sometimes an object, we just ignore the non-empty strings
  if (item && typeof item === 'string') {
    return
  }

  if (item?.arcGISMagicKey) {
    const arcGISAddress = await getAddressFromArcGISMagicKey(
      item.arcGISMagicKey
    )
    emit('update', {
      ...item,
      ...(arcGISAddress || {}),
      arcGISMagicKey: undefined
    })
  } else {
    emit('update', item || null)
  }

  // Because this was a user initiated action, we want to animate the zoom
  pendingZoomAnimation.value = true
}

const fetchSuggestions = async (query: string) => {
  try {
    if (props.suggestionsConfig?.function) {
      const suggestionsFn = useAppConfigFunction(
        props.suggestionsConfig.function,
        'suggestionsFunctions'
      )

      return await suggestionsFn(query, props.suggestionsConfig.args)
    }

    return await useLegacySuggestions(
      query,
      props.suggestionsIndex,
      props.suggestionsKey,
      props.mapResultsFnName
    )
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
  // There is the option of overriding the default zoom behavior by passing in an app config function
  //
  // In app.config.ts:
  // {
  //   ripple: {
  //     search: {
  //       onLocationSelectOverrideFns: <function>
  //     }
  //   }
  // }
  //
  if (props.onLocationSelectOverrideFn) {
    const overrideFn = useAppConfigFunction(
      props.onLocationSelectOverrideFn,
      'onLocationSelectOverrideFns'
    )

    const didOverride = overrideFn(
      map,
      popup,
      location,
      props.userGeolocation,
      deadSpace
    )

    // Sometimes you only want to override the behavior for a specific behavior, and it would be
    // annoying to have to reimplement everything else. For this reason, the function can return a
    // boolean indicating whether the behavior was overridden. If false, the default behavior will
    // still run.
    //
    // If the function doesn't return anything (i.e. undefined), the default behavior won't run
    if (didOverride || typeof didOverride === undefined) {
      return
    }
  }

  if (!props.controlMapZooming) {
    return
  }

  // Zoom to the user's geolocation if enabled
  if (location?.useGeolocation && props.userGeolocation) {
    const center = [
      props.userGeolocation.center[0],
      props.userGeolocation.center[1]
    ]

    const zoom = 16

    centerMap(map, fromLonLat(center), zoom, deadSpace.value, null)

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
        padding: props.bboxZoomPadding,
        animationDuration: animate ? 800 : 0
      })
    }

    return
  }

  if (map && location?.center) {
    const zoom = location?.zoomLevel || 16
    centerMap(map, fromLonLat(location?.center), zoom, deadSpace.value, null)
    return
  }

  if (!location) {
    // reset back to initial view on empty query
    fitDefaultExtent(map, deadSpace.value, defaultExtent)
  }
}
</script>
