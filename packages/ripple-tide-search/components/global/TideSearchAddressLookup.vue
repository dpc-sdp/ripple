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
      :getOptionId="(itm:any) => itm.id"
      :getSuggestionVal="(itm:any) => itm?.locality || ''"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option?.locality }}</span>
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
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import { fromLonLat } from 'ol/proj'

interface Props {
  inputValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null
})

const results = ref([])

type addressResultType = {
  name: string
  latitude: number
  longitude: number
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

const fetchVicPostcodes = async (query: string) => {
  const searchUrl = `/api/tide/app-search/vic-postcode-localities/search`
  const queryDSL = {
    query,
    search_fields: {
      locality: {},
      postcode: {}
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
      return response.results.map((itm) => ({
        id: itm.id.raw,
        locality: itm.locality.raw,
        postcode: itm.postcode.raw,
        location: itm.location.raw
      }))
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

  const res = await fetchVicPostcodes(q)

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
      centerMapOnLocation(newMap, props.inputValue.location, false)
    }
  }
)

// Center the map on the location when the location changes
// We look for the value of pendingZoomAnimation to determine if we should animate the zoom
watch(
  () => props.inputValue?.location,
  (newLoc) => {
    centerMapOnLocation(rplMapRef.value, newLoc, pendingZoomAnimation.value)
    pendingZoomAnimation.value = false
  }
)

function centerMapOnLocation(map, location, animate: false) {
  if (map && location) {
    const targetZoom = 13
    const duration = animate ? 800 : 0

    const locationArr = location.split(',')
    const lat = parseFloat(locationArr[0])
    const lng = parseFloat(locationArr[1])
    const center = fromLonLat([lng, lat], 'EPSG:3857')

    map.getView().animate({ center, zoom: targetZoom, duration })
  }
}
</script>
