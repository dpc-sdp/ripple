<template>
  <ol-vector-layer :title="layerIdentifier" :zIndex="1">
    <ol-source-vector :zIndex="0" :url="areaUrl" :format="shapeFormat">
    </ol-source-vector>
    <ol-style>
      <ol-style-stroke :color="lineColor" width="2"></ol-style-stroke>
      <ol-style-fill :color="fillColor"></ol-style-fill>
    </ol-style>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { GeoJSON } from 'ol/format'
import { get } from 'ol/proj'
import { Style, Fill, Stroke } from 'ol/style'
import { computed, inject, onMounted, nextTick } from 'vue'
interface Props {
  results: any[]
  lineColor?: string | Number[]
  fillColor?: string | Number[]
  areaDataKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  results: () => [],
  lineColor: () => [102, 102, 102, 1],
  fillColor: () => [26, 26, 26, 0.1],
  areaDataKey: 'postcode'
})

const areas = computed(() => {
  const matches =
    Array.isArray(props.results) &&
    props.results.filter((itm) => {
      const itemProperties = itm.getProperties()
      return (
        !itemProperties.lat && itemProperties[props.areaDataKey] !== undefined
      )
    })
  return matches
})

const shapeFormat = new GeoJSON()

const areaUrl = computed(() => {
  const arcGISURL =
    'https://services6.arcgis.com/GB33F62SbDxJjwEL/ArcGIS/rest/services/Vicmap_Admin/FeatureServer/17/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&returnEnvelope=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=3&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

  return arcGISURL
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

const centerOnPopup = (map, popup, offset = { y: -100, x: 0 }) => {
  const view = map.getView()
  const resolution = view.getResolution()
  const offsetCoord = [
    popup.value.position[0] + offset.x * resolution,
    popup.value.position[1] + offset.y * resolution
  ]

  view.animate({
    center: offsetCoord,
    duration: 600
  })
}

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
      const clickedFeatures = []
      // We need to keep track of features that are clicked outside of the shape layer, so that pins can take priority over the shape
      const outOfLayerClickedFeatures = []

      // Get the features at the click position
      map.forEachFeatureAtPixel(
        evt.pixel,
        (f, layer) => {
          if (layer.get('title') === layerIdentifier) {
            clickedFeatures.push(f)
          } else {
            outOfLayerClickedFeatures.push(f)
          }
        },
        {
          hitTolerance: 5
        }
      )

      if (outOfLayerClickedFeatures.length || !clickedFeatures.length) {
        return
      }
      const feature = clickedFeatures[0]

      const matchingResult = areas.value.find((itm) => {
        return (
          itm.getProperties().postcode === feature?.getProperties().postcode
        )
      })

      popup.value.isArea = true
      popup.value.feature = [matchingResult.getProperties()]
      popup.value.isOpen = true
      popup.value.position = feature.getGeometry().flatCoordinates
      centerOnPopup(map, popup)
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
