<template>
  <div class="tide-search-address-lookup">
    <RplSearchBar
      inputLabel="Enter a search term"
      :submitLabel="false"
      :inputValue="inputValue"
      :suggestions="results"
      :showNoResults="true"
      :debounce="5000"
      placeholder="Search by address, postcode or suburb"
      :getSuggestionVal="(itm:any) => itm?.name || ''"
      @submit="submitAction"
      @update:input-value="onUpdate"
    >
      <template #suggestion="{ option: { option } }">
        <span>{{ option.name }}</span>
        <RplChip
          v-if="option?.council"
          class="rpl-u-margin-l-4"
          :label="option?.council"
        ></RplChip>
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import { Fill, Stroke, Style } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { getCenter } from 'ol/extent'
import EsriJSON from 'ol/format/EsriJSON'

interface Props {
  addresses: boolean
  lgas: boolean
  suburbs: boolean
  inputValue: any
}

const props = withDefaults(defineProps<Props>(), {
  addresses: false,
  lgas: true,
  suburbs: false,
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

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  const res: { results: addressResultType[] } = await $fetch(
    '/api/services/address',
    {
      query: {
        q,
        suburbs: props.suburbs,
        addresses: props.addresses,
        lgas: props.lgas
      }
    }
  )
  if (res.results && res.results.length > 0) {
    results.value = res.results
  } else if (q === '') {
    results.value = []
  }
}, 300)

const removeMapLayers = (map) => {
  map.getLayers().forEach((layer) => {
    // If it's a vector layer with a source, clear the source and dispose of the layer
    if (layer instanceof VectorLayer) {
      const layerType = layer.get('layerType')
      if (layerType === 'lga') {
        map.removeLayer(layer)
        const source = layer.getSource()
        // Clear the source's features
        source.clear()
        // Dispose of the source
        source.dispose()
        // Dispose of the layer
        layer.dispose()
      }
    }
  })
}

function drawVectorLayer(lgaKey) {
  const style = new Style({
    stroke: new Stroke({
      color: [0, 0, 0, 1],
      width: 5.5
    })
  })
  const vectorSource = new VectorSource({
    format: new EsriJSON(),
    url: function (extent, resolution, projection) {
      // ArcGIS Server only wants the numeric portion of the projection ID.
      const srid = projection
        .getCode()
        .split(/:(?=\d+$)/)
        .pop()

      const serviceUrl = `https://services6.arcgis.com/GB33F62SbDxJjwEL/arcgis/rest/services/Vicmap_Admin/FeatureServer`
      const layer = '9'
      const format = 'json'
      const query = encodeURIComponent(`LGA_NAME='${lgaKey}'`)
      const url = `${serviceUrl}/${layer}/query/?where=${query}&f=${format}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometryType=esriGeometryEnvelope&inSR=${srid}&outFields=*&outSR=${srid}`

      return url
    }
  })

  function isExtentValid(extent) {
    return extent[0] < extent[2] && extent[1] < extent[3]
  }

  vectorSource.on('change', function () {
    if (vectorSource.getState() === 'ready') {
      // Get the extent of the features in the vector source
      const extent = vectorSource.getExtent()
      if (isExtentValid(extent)) {
        // Calculate the center of the extent
        const view = rplMapRef.value.getView()
        const padding = 60
        view.fit(extent, {
          padding: [padding, padding, padding, padding], // Optional padding in pixels
          duration: 1000 // Optional animation duration in milliseconds
        })
      }
    }
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: function () {
      return style
    },
    opacity: 0.7
  })
  vectorLayer.set('layerType', 'lga')

  // remove existing layers
  removeMapLayers(rplMapRef.value)
  // Add the vector layer to the existing map
  rplMapRef.value.addLayer(vectorLayer)
}

function onAddressSearch(payload: any) {
  if (payload.lga_key) {
    drawVectorLayer(payload.lga_key)
  }

  if (!payload.council) {
    // for point locations just center on the point
    // centerMap([payload.longitude, payload.latitude])
  } else {
    // if (payload.lga_key) {
    //   drawVectorLayer(payload.lga_key)
    // }
    // center map on shape center
  }
}

function centerMap(center: [number, number]) {
  const map = rplMapRef.value
  if (map) {
    map.getView().setCenter(center)
    map.getView().setZoom(14)
  }
}
</script>
