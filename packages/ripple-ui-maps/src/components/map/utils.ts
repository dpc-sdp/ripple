import { boundingExtent } from 'ol/extent'
import { transform, transformExtent } from 'ol/proj'
import { getDistance } from 'ol/sphere'
import { inAndOut } from 'ol/easing'

export const haversineDistance = (coord1, coord2) => getDistance(coord1, coord2)

export const areCoordinatesWithinThreshold = (coords, threshold) => {
  return coords.every((coord1, index1) => {
    return coords.slice(index1 + 1).every((coord2) => {
      const distance = haversineDistance(coord1, coord2)
      return distance <= threshold
    })
  })
}

export const getfeaturesAtMapPixel = (
  map,
  pixel,
  identifier = 'clusterLayer',
  options = { hitTolerance: 5 }
) => {
  return map.forEachFeatureAtPixel(
    pixel,
    (feature, layer) => {
      if (layer.get('title') === identifier) {
        return feature.getProperties()
      }
    },
    options
  )
}

export const zoomToClusterExtent = (
  features,
  popup,
  map,
  projection = 'EPSG:3857',
  thresholdDistance = 100
) => {
  const clusterExtentCoordinates = features.map((f) => {
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
    popup.value.feature = features.map((f) => f.getProperties())
    popup.value.position = features[0].getGeometry().flatCoordinates
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
        easing: inAndOut,
        duration: 800,
        padding: [100, 100, 100, 100]
      })
    }
  }
}

export const centerMap = (
  map,
  position = [0, 0],
  offset = { y: -100, x: 0 },
  zoom
) => {
  const view = map.getView()
  const resolution = view.getResolution()
  const offsetCoord = [
    position[0] + offset.x * resolution,
    position[1] + offset.y * resolution
  ]

  view.animate({
    center: offsetCoord,
    duration: 1200,
    easing: inAndOut,
    zoom: zoom || view.getZoom()
  })
}
