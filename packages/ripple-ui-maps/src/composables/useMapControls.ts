import { inject } from 'vue'
import { easeOut } from 'ol/easing'
import { fitDefaultExtent } from './../components/map/utils.ts'

export default (mapRef) => {
  const { deadSpace, defaultExtent } = inject('rplMapInstance')

  /**
   * @param {number} delta Zoom delta.
   * @private
   */
  function zoomByDelta(delta, duration = 250) {
    const view = mapRef.value.map.getView()
    if (!view) {
      // the map does not have a view, so we can't act
      // upon it
      return
    }
    const currentZoom = view.getZoom()
    if (currentZoom !== undefined) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta)
      if (duration > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations()
        }
        view.animate({
          zoom: newZoom,
          duration: duration,
          easing: easeOut
        })
      } else {
        view.setZoom(newZoom)
      }
    }
  }

  /**
   * @param {Document} doc The root document to check.
   * @return {boolean} Fullscreen is supported by the current platform.
   */
  function isFullScreenSupported(doc) {
    const body = doc.body
    return !!(
      body['webkitRequestFullscreen'] ||
      (body.requestFullscreen && doc.fullscreenEnabled)
    )
  }

  /**
   * @param {Document} doc The root document to check.
   * @return {boolean} Element is currently in fullscreen.
   */
  function isFullScreen(doc) {
    return !!(doc['webkitIsFullScreen'] || doc.fullscreenElement)
  }

  /**
   * Request to fullscreen an element.
   * @param {HTMLElement} element Element to request fullscreen
   */
  function requestFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element['webkitRequestFullscreen']) {
      element['webkitRequestFullscreen']()
    }
  }

  /**
   * Request to fullscreen an element with keyboard input.
   * @param {HTMLElement} element Element to request fullscreen
   */
  function requestFullScreenWithKeys(element) {
    if (element['webkitRequestFullscreen']) {
      element['webkitRequestFullscreen']()
    } else {
      requestFullScreen(element)
    }
  }

  /**
   * Exit fullscreen.
   * @param {Document} doc The document to exit fullscren from
   */
  function exitFullScreen(doc) {
    if (doc.exitFullscreen) {
      doc.exitFullscreen()
    } else if (doc['webkitExitFullscreen']) {
      doc['webkitExitFullscreen']()
    }
  }

  function handleFullScreen(withKeys = false) {
    const map = mapRef.value.map
    if (!map) {
      return
    }
    const doc = map.getOwnerDocument()
    if (!isFullScreenSupported(doc)) {
      return
    }

    if (isFullScreen(doc)) {
      exitFullScreen(doc)
    } else {
      const element = map.getTargetElement()
      if (withKeys) {
        requestFullScreenWithKeys(element)
      } else {
        requestFullScreen(element)
      }
    }
  }

  function onHomeClick() {
    fitDefaultExtent(mapRef.value.map, deadSpace.value, defaultExtent)
  }
  function onZoomInClick() {
    zoomByDelta(1)
  }
  function onZoomOutClick() {
    zoomByDelta(-1)
  }
  function onFullScreenClick() {
    handleFullScreen()
  }

  return {
    onHomeClick,
    onZoomInClick,
    onZoomOutClick,
    onFullScreenClick
  }
}
