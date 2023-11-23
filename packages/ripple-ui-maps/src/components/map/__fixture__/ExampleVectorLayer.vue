<template>
  <ol-vector-layer :title="layerIdentifier">
    <ol-source-vector :url="areaUrl" :format="shapeFormat"> </ol-source-vector>
    <ol-style>
      <ol-style-stroke :color="lineColor" width="2"></ol-style-stroke>
      <ol-style-fill :color="fillColor"></ol-style-fill>
    </ol-style>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { GeoJSON } from 'ol/format'
import { Style, Fill, Stroke } from 'ol/style'
import { computed, inject, onMounted, nextTick } from 'vue'
interface Props {
  results: any[]
  lineColor: string | Number[]
  fillColor: string | Number[]
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  lineColor: () => [102, 102, 102, 1],
  fillColor: () => [26, 26, 26, 0.1]
})

const mappedAreas = computed(() => {
  return props.results
    .filter((itm) => !itm.lat && itm.postcode)
    .map((area) => `'${area.postcode}'`)
})
const shapeFormat = new GeoJSON()

const areaUrl = computed(() => {
  const baseArcGISURL =
    'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/14/query'
  const query = `postcode IN (${mappedAreas.value.join(',')})`
  const inSR = '4326'
  return `${baseArcGISURL}?where=${query}&geometryType=esriGeometryEnvelope&inSR=${inSR}&spatialRel=esriSpatialRelIntersects&units=esriSRUnit_Meter&returnGeodetic=false&outFields=postcode&returnGeometry=true&returnCentroid=false&f=pgeojson&token=`
})
const { rplMapRef, popup } = inject('rplMapInstance')

const defaultStyleFn = new Style({
  fill: new Fill({
    color: props.fillColor
  }),
  stroke: new Stroke({
    color: props.lineColor,
    width: 1
  })
})
const mouseOverStyleFn = new Style({
  fill: new Fill({
    color: [26, 26, 26, 0.3]
  }),
  stroke: new Stroke({
    color: props.lineColor,
    width: 1
  })
})

const layerIdentifier = 'shapeLayer'

onMounted(async () => {
  await nextTick()
  if (rplMapRef.value) {
    const map = rplMapRef.value

    // Get reference to shapeLayer by title identifier
    const allLayers = map.getLayers().getArray()
    const shapeLayer = Array.from(allLayers).find(
      (layer) => layer.get('title') === layerIdentifier
    )
    // define filter for getting only shapeLayer
    const layerFilter = (feature, layer) => {
      if (layer.get('title') === layerIdentifier) {
        return feature
      }
    }

    map.on('singleclick', function (evt) {
      // Get the features at the click position
      const feature = map.forEachFeatureAtPixel(evt.pixel, layerFilter, {
        hitTolerance: 5
      })

      const matchingResult = props.results.find(
        (itm) => itm.postcode === feature.get('postcode')
      )
      popup.value.isArea = true
      popup.value.feature = [matchingResult]
      popup.value.isOpen = true
      popup.value.position = feature.getGeometry().flatCoordinates
    })
    // Add a pointermove event listener to the map to detect shape hover
    map.on('pointermove', function (evt) {
      // Get the features at the mouse position
      const feature = map.forEachFeatureAtPixel(evt.pixel, layerFilter, {
        hitTolerance: 5
      })
      // reset all shapes not hovered
      shapeLayer
        .getSource()
        .getFeatures()
        .forEach(function (feature) {
          feature.setStyle(defaultStyleFn)
        })
      // Change the style for the hovered shape on mouseover
      if (feature) {
        feature.setStyle(mouseOverStyleFn)
      }
    })
  }
})
</script>
