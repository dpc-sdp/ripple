import { boundingExtent, Extent } from 'ol/extent'
import { transform, transformExtent } from 'ol/proj'
import { getDistance } from 'ol/sphere'
import { inAndOut } from 'ol/easing'
import Map from 'ol/Map'

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

const getNormalisedFeatureCoordinates = (features, projection) => {
  return features.map((f) => {
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
}

export const areFeaturesCloseTogether = (
  features,
  thresholdDistance = 20,
  projection = 'EPSG:3857'
) => {
  const coordinates = getNormalisedFeatureCoordinates(features, projection)
  return areCoordinatesWithinThreshold(coordinates, thresholdDistance)
}

export const zoomToClusterExtent = (
  features,
  popup,
  map,
  projection = 'EPSG:3857',
  deadSpace
) => {
  const clusterExtentCoordinates = getNormalisedFeatureCoordinates(
    features,
    projection
  )

  // zoom to fit all features in cluster in view
  const zoomRegion =
    projection === 'EPSG:3857'
      ? transformExtent(
          boundingExtent(clusterExtentCoordinates),
          'EPSG:4326',
          'EPSG:3857'
        )
      : boundingExtent(clusterExtentCoordinates)

  fitExtent(map, zoomRegion, deadSpace, {
    padding: 100,
    animationDuration: 0
  })
}

export function getFeaturesCenterPoint(features) {
  const coordinates = features.map(
    (feature) => feature.getGeometry().flatCoordinates
  )

  const sum = coordinates.reduce(
    (acc: number, coord: number) => {
      acc[0] += coord[0]
      acc[1] += coord[1]
      return acc
    },
    [0, 0]
  )

  return [sum[0] / coordinates.length, sum[1] / coordinates.length]
}

/**
 * Find the distance we need to move from the center of the map to account for the
 * dead space taken up by the sidepanel/sidebars/popups etc. The purpose of this function
 * is to calculate the offset needed to center the map on a specific point, inside the
 * available space on the map.
 *
 * Note that in OpenLayers, the x-axis is positive to the right and the y-axis is positive
 * downwards.
 */
const getCenterPointDelta = (
  mapWidth: number,
  mapHeight: number,
  _deadSpace?: MapDeadSpace
): [number, number] => {
  const defaultDeadSpace = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  const deadSpace = {
    ...defaultDeadSpace,
    ...(_deadSpace || {})
  }

  const mapCenterX = mapWidth / 2
  const mapCenterY = mapHeight / 2

  const availableWidth = mapWidth - deadSpace.left - deadSpace.right
  const availableHeight = mapHeight - deadSpace.top - deadSpace.bottom

  const newCenterX = deadSpace.left + availableWidth / 2
  const newCenterY = deadSpace.top + availableHeight / 2

  // Get the difference between the current center and the new center
  const deltaX = mapCenterX - newCenterX
  const deltaY = newCenterY - mapCenterY

  return [deltaX, deltaY]
}

export const centerMap = (
  map,
  position = [0, 0],
  zoom,
  deadSpace,
  popupType
) => {
  if (!map) {
    return
  }

  // Figure out offset based on the amount of space taken up by the sidepanel/sidebar
  const mapSize = map.getSize()
  const mapWidth = mapSize ? mapSize[0] : 0
  const mapHeight = mapSize ? mapSize[0] : 0

  const delta = getCenterPointDelta(mapWidth, mapHeight, deadSpace)

  // If the popup is a popover, we need to adjust the y-axis to account for the
  // desired design of the popover.
  const yCorrection = popupType === 'popover' ? -100 : 0

  const offset = {
    x: delta[0],
    y: delta[1] + yCorrection
  }

  const view = map.getView()
  const resolution = view.getResolutionForZoom(zoom || view.getZoom())
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

type MapDeadSpace = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type MapDefaultExtent = [number, number, number, number]

export const fitExtent = (
  map: Map,
  extent: Extent,
  _deadSpace?: MapDeadSpace,
  {
    animationDuration = 0,
    padding = 12
  }: { animationDuration?: number; padding?: number } = {}
) => {
  const defaultDeadSpace = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  if (!map || !extent) {
    return
  }

  const deadSpace = {
    ...defaultDeadSpace,
    ...(_deadSpace || {})
  }

  map.getView().fit(extent, {
    easing: inAndOut,
    duration: animationDuration,
    padding: [
      padding + deadSpace.top,
      padding + deadSpace.right,
      padding + deadSpace.bottom,
      padding + deadSpace.left
    ]
  })
}

export const fitVictoria = (map: Map, deadSpace?: MapDeadSpace) => {
  const victoriaBoundingBox = [
    15691021.8303, -4740581.4984, 16695098.6338, -4026353.9061
  ]

  fitExtent(map, victoriaBoundingBox, deadSpace)
}

export const fitDefaultExtent = (
  map: Map,
  deadSpace?: MapDeadSpace,
  defaultExtent?: MapDefaultExtent
) => {
  if (!defaultExtent) {
    return fitVictoria(map, deadSpace)
  }

  fitExtent(map, defaultExtent, deadSpace)
}
