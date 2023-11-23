import { onMounted, ref } from 'vue'
import { boundingExtent, intersects } from 'ol/extent'
import { transform, transformExtent } from 'ol/proj'
import { Style, Circle } from 'ol/style'
import { getDistance } from 'ol/sphere'
import { easeOut } from 'ol/easing'
import type { Map } from 'ol'
import type { Ref } from 'vue'

export const haversineDistance = (coord1, coord2) => getDistance(coord1, coord2)

export const areCoordinatesWithinThreshold = (coords, threshold) => {
  return coords.every((coord1, index1) => {
    return coords.slice(index1 + 1).every((coord2) => {
      const distance = haversineDistance(coord1, coord2)
      return distance <= threshold
    })
  })
}

export default (
  mapRef: Ref<{ map: Map } | null>,
  popup: Ref<{ feature: any; position: [number, number]; isOpen: Boolean }>,
  closeOnMapClick,
  projection = 'EPSG:4326',
  thresholdDistance = 1000
) => {
  onMounted(() => {
    const map = mapRef.value?.map
    if (map) {
      // Get reference to shapeLayer by title identifier
      const layerIdentifier = 'clusterLayer'
      const allLayers = map.getLayers().getArray()
      const clusterLayer = Array.from(allLayers).find(
        (layer) => layer.get('title') === layerIdentifier
      )
      map.on('singleclick', function (evt) {
        // finds all features at cursor
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature, layer) => {
            if (layer.get('title') === 'clusterLayer') {
              return feature.getProperties()
            }
          },
          {
            hitTolerance: 5
          }
        )
        if (feature?.features) {
          if (feature.features.length > 1) {
            const clusterExtentCoordinates = feature.features.map((f) => {
              const geo = f.getGeometry()
              if (geo) {
                const coordinates = geo.getCoordinates()
                if (projection === 'EPSG:3857') {
                  // we transform all coordinates to match projection
                  return transform(coordinates, 'EPSG:3857', 'EPSG:4326')
                }
                return coordinates
              }
            })

            // work out if coordinates are within x distance of each other
            const isFeaturesCloseTogether = areCoordinatesWithinThreshold(
              clusterExtentCoordinates,
              thresholdDistance
            )

            if (isFeaturesCloseTogether) {
              // show multiple items together if they are close
              popup.value.feature = feature.features.map((f) =>
                f.getProperties()
              )
              popup.value.position =
                feature.features[0].getGeometry().flatCoordinates
              popup.value.isOpen = true
            } else {
              // zoom to fit all features in cluster in view
              const zoomRegion =
                projection === 'EPSG:3857'
                  ? transformExtent(
                      boundingExtent(clusterExtentCoordinates),
                      'EPSG:4326',
                      'EPSG:3857'
                    )
                  : boundingExtent(clusterExtentCoordinates)

              const mapSize = map.getSize()
              if (mapSize) {
                map.getView().fit(zoomRegion, {
                  size: mapSize,
                  easing: easeOut,
                  duration: 400,
                  padding: [100, 100, 100, 100]
                })
              }
            }
          } else {
            console.time('click on feature')
            // click on feature
            const clickedFeature = feature.features[0]
            popup.value.feature = [clickedFeature.getProperties()]
            popup.value.isOpen = true
            popup.value.position =
              feature.features[0].getGeometry().flatCoordinates

            const offsetX = 0 // Replace with the desired offset in pixels
            const offsetY = -100 // Replace with the desired offset in pixels

            const view = map.getView()
            const resolution = view.getResolution()
            const offsetCoord = [
              popup.value.position[0] + offsetX * resolution,
              popup.value.position[1] + offsetY * resolution
            ]

            view.animate({
              center: offsetCoord
            })
            console.timeEnd('click on feature')
          }
        } else if (closeOnMapClick) {
          popup.value.isOpen = false
        }
      })
      // remove features not in view
      // map.on('moveend', function () {
      //   // Get the extent of the current map view
      //   const extent = map.getView().calculateExtent(map.getSize())

      //   // Iterate through all features in the layer's source
      //   clusterLayer.getSource().forEachFeature(function (feature) {
      //     // Check if the feature's geometry intersects with the current map extent
      //     const featureExtent = feature.getGeometry().getExtent()
      //     const isVisible = intersects(extent, featureExtent)

      //     // If the feature is outside the viewport, remove it; otherwise, add it back
      //     if (!isVisible) {
      //       console.log(feature.getProperties())
      //       clusterLayer.getSource().removeFeature(feature)
      //     } else {
      //       // Optionally, you may want to check if the feature is already in the layer before adding
      //       if (!clusterLayer.getSource().getFeatures().includes(feature)) {
      //         clusterLayer.getSource().addFeature(feature)
      //       }
      //     }
      //   })
      // })
    }
  })
}
