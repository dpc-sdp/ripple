import { onMounted, ref } from 'vue'
import { buffer, boundingExtent } from 'ol/extent'
import { getDistance } from 'ol/sphere'
import type { Map } from 'ol'
import type { Ref } from 'vue'

// Threshold distance in meters to determine if features are clickable
const thresholdDistance = 100 // 100 meters

export const haversineDistance = (coord1, coord2) => getDistance(coord1, coord2)

export const areCoordinatesWithinThreshold = (coords, threshold) => {
  return coords.every((coord1, index1) => {
    return coords.slice(index1 + 1).every((coord2) => {
      return haversineDistance(coord1, coord2) <= threshold
    })
  })
}

export default (mapRef: Ref<{ map: Map } | null>, closeOnMapClick) => {
  const popupIsOpen = ref(false)
  const selectedFeatures = ref(null)

  onMounted(() => {
    const map = mapRef.value?.map
    if (map) {
      map.on('singleclick', function (evt) {
        // IF evt.cordinates match a pin then show
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
                return geo.getCoordinates()
              }
            })

            // work out if coordinates are within x distance of each other
            const isFeaturesCloseTogether = areCoordinatesWithinThreshold(
              clusterExtentCoordinates,
              thresholdDistance
            )

            // zoom to region
            console.log(
              'isFeaturesCloseTogether',
              clusterExtentCoordinates,
              isFeaturesCloseTogether
            )
            if (isFeaturesCloseTogether) {
              selectedFeatures.value = feature.features.map((f) =>
                f.getProperties()
              )
              popupIsOpen.value = true
            } else {
              const zoomRegion = buffer(
                boundingExtent(clusterExtentCoordinates),
                1
              )
              const mapSize = map.getSize()
              if (mapSize) {
                map.getView().fit(zoomRegion, { size: mapSize })
              }
            }
          } else {
            selectedFeatures.value = [feature.features[0].getProperties()]
            popupIsOpen.value = true
          }
        } else if (closeOnMapClick && feature) {
          selectedFeatures.value = [feature.getProperties()]
          popupIsOpen.value = false
        }
      })
    }
  })
  return {
    popupIsOpen,
    selectedFeatures
  }
}
