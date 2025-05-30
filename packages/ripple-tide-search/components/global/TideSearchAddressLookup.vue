<template>
  <div class="tide-search-address-lookup">
    <TideSearchLocationAutocomplete
      :inputValue="
        inputValue?.useGeolocation ? userGeolocation || null : inputValue
      "
      :suggestionsIndex="suggestionsIndex"
      :suggestionsKey="suggestionsKey"
      :label="label"
      :placeholder="placeholder"
      :tagsComponent="tagsComponent"
      :mapResultsFnName="mapResultsFnName"
      :isGettingLocation="isGettingLocation"
      :suggestionsConfig="suggestionsConfig"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import { ref } from '#imports'
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
  filters?: Record<string, any>
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
  bboxZoomPadding: 100,
  filters: null
})

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()

const { rplMapRef, popup, deadSpace, defaultExtent } = inject('rplMapInstance')

const pendingZoomAnimation = ref(false)

const handleUpdate = (item) => {
  // Because this was a user initiated action, we want to animate the zoom
  pendingZoomAnimation.value = true

  emit('update', item || null)
}

// Center the map on the correct location on first load or when switching back to the map tab
//
// Wait until both:
// - the openlayers map instance has been created
// - the map results have loaded
// Then listen for the 'rendercomplete' event is fired by openlayers before centering
watch(
  [() => rplMapRef.value, () => props.resultsloaded],
  ([newMapRef, newLoaded], [oldMapRef, oldLoaded]) => {
    const stateHasChanged = newMapRef !== oldMapRef || newLoaded !== oldLoaded

    if (!stateHasChanged) {
      return
    }

    if (newMapRef && newLoaded) {
      rplMapRef.value.once('rendercomplete', function () {
        centerMapOnLocation(newMapRef, props.inputValue, false)
      })
    }
  }
)

// Center the map on the location when the location or filters change
// We look for the value of pendingZoomAnimation to determine if we should animate the zoom
watch(
  [() => props.inputValue?.id, () => props.filters],
  async () => {
    await nextTick()
    centerMapOnLocation(
      rplMapRef.value,
      props.inputValue,
      pendingZoomAnimation.value
    )
    pendingZoomAnimation.value = false
  },
  { deep: true }
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
