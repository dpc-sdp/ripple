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
const { emitRplEvent } = useRippleEvent('tide-address-lookup', emit)

const { rplMapRef } = inject('rplMapInstance')

async function submitAction(e: any) {
  const item = e.value
  emitRplEvent('update', item)
  onAddressSearch(item)
}

const fetchVicPostcodes = async (q: string) => {
  const isDev = true
  const searchUrl = `/api/tide/app-search/vic-postcode-localities/elasticsearch/_search`
  const queryDSL = {
    query: {
      bool: {
        should: [{ prefix: { postcode: q } }, { prefix: { locality: q } }]
      }
    }
  }
  if (isDev) {
    console.log(JSON.stringify(queryDSL))
  }
  try {
    const response = await $fetch(searchUrl, {
      method: 'POST',
      body: {
        ...queryDSL,
        size: 4
      }
    })
    if (response && response.hits?.total?.value > 0) {
      return response.hits.hits.map((itm) => itm._source)
    }
  } catch (e) {
    console.error(e)
  }
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  const res = await fetchVicPostcodes(q)
  if (res && res.length > 0) {
    results.value = res
  } else if (q === '') {
    results.value = []
  }
}, 300)

function onAddressSearch(payload: any) {
  if (payload.location) {
    // Extract latitude and longitude values
    const locationArr = payload.location.split(',')
    const lat = parseFloat(locationArr[0])
    const lng = parseFloat(locationArr[1])
    const location = fromLonLat([lng, lat], 'EPSG:3857')
    centerMap(location)
  }
}

function centerMap(center: [number, number]) {
  const map = rplMapRef.value
  if (map) {
    const zoom = 13
    map.getView().animate({ center, zoom })
  }
}
</script>
