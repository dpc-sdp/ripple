export const sortByTitle = items => {
  return items.sort(function (a, b) {
    const nameA = a.title.toLowerCase()
    const nameB = b.title.toLowerCase()
    if (nameA < nameB) {
      // Sort string ascending
      return -1
    }

    if (nameA > nameB) {
      return 1
    }

    return 0 // Default return value (no sorting)
  })
}

export const emptyArray = items => {
  if (items) {
    items.splice(0, items.length)
  }
}

export const toggleFullScreen = divId => {
  // if already full screen; exit
  // else go fullscreen
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    var element = document.getElementById(divId)
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else if (element.msRequestFullscreen) {
      // TODO: Doesn't look like it works in IE11
      element.msRequestFullscreen()
    }
  }
}
