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
import { transformExtent } from 'ol/proj'
import { inAndOut } from 'ol/easing'
import { boundingExtent } from 'ol/extent'
import { GeoJSON, MultiPolygon } from 'ol/format'
// TODO must add analytics events
// import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  inputValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null
})

const results = ref([])

type addressResultType = {
  name: string
  postcode: string
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

const baseArcGISURL =
  'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/'

async function fetchPostcodeRegion(query: string) {
  const where = `postcode='${query}'`
  const inSR = '4326'
  const featureServer = '14' // https://www.arcgis.com/apps/mapviewer/index.html?url=https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/14&source=sd
  const queryUrl = `${baseArcGISURL}/${featureServer}/query`
  try {
    const response: any = await $fetch(queryUrl, {
      params: {
        where,
        geometryType: 'esriGeometryEnvelope',
        inSR,
        returnExtentOnly: true,
        f: 'pgeojson'
      }
    })
    if (response.bbox) {
      return response.bbox
    }
  } catch (e) {
    console.error(e)
  }
}

const fetchSuggestions = async (query: string) => {
  const searchUrl = `/api/tide/app-search/vic-postcode-localities/search`
  const queryDSL = {
    query,
    search_fields: {
      locality: {},
      postcode: {}
    },
    page: {
      size: 8
    }
  }

  try {
    const response = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL
      }
    })
    if (response && response.meta.page.total_results > 0) {
      return response.results.map((itm: any) => {
        return {
          name: itm.locality.raw,
          postcode: itm.postcode.raw
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  if (!q || typeof q !== 'string') {
    results.value = []
    return
  }
  const res = await fetchSuggestions(q)
  if (!res || res.length === 0) {
    results.value = []
  } else {
    results.value = res
  }
}, 300)

// Center the map on the location when the map is ready
// It can take a while for the map to be ready, so we need to watch for it
// We don't animate the zoom here, because it's the initial load or a tab change
watch(
  () => rplMapRef.value,
  (newMap, oldMap) => {
    if (!oldMap && newMap) {
      centerMapOnLocation(newMap, props.inputValue, false)
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
  if (map && location?.postcode) {
    // fetch the geometry of the postcode so we can zoom to its extent
    const bbox = await fetchPostcodeRegion(location.postcode)
    console.log('bbox', bbox)
    if (bbox) {
      const zoomRegion = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857')
      const mapSize = map.getSize()
      if (mapSize) {
        map.getView().fit(zoomRegion, {
          size: mapSize,
          easing: inAndOut,
          duration: animate ? 800 : 0,
          padding: [100, 100, 100, 100]
        })
      }
    }
  }
}
</script>
