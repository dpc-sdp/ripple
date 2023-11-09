import { onMounted, ref } from 'vue'
import { boundingExtent } from 'ol/extent'
import { transform, transformExtent } from 'ol/proj'
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
  closeOnMapClick,
  projection = 'EPSG:4326',
  thresholdDistance = 1000
) => {
  const popupIsOpen = ref(false)
  const selectedFeatures = ref(null)
  const overlayPosition = ref(null)

  onMounted(() => {
    const map = mapRef.value?.map
    if (map) {
      map.on('singleclick', function (evt) {
        // finds all features at cursor
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => {
            return feature.getProperties()
          },
          { hitTolerance: 5 }
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
              selectedFeatures.value = feature.features.map((f) =>
                f.getProperties()
              )

              overlayPosition.value =
                feature.features[0].getGeometry().flatCoordinates
              popupIsOpen.value = true
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
            // click on feature
            selectedFeatures.value = [feature.features[0].getProperties()]
            popupIsOpen.value = true
            overlayPosition.value =
              feature.features[0].getGeometry().flatCoordinates
            map.getView().animate({
              center: overlayPosition.value,
              zoom: 9
            })
          }
        } else if (closeOnMapClick) {
          popupIsOpen.value = false
        }
      })
    }
  })
  return {
    popupIsOpen,
    selectedFeatures,
    overlayPosition
  }
}
