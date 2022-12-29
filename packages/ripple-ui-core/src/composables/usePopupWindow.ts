export function usePopupWindow(content: any, key: string) {
  // Client side only
  if (typeof window !== 'undefined') {
    const popup = {
      width: 626,
      height: 436
    }

    let popupWindow: Window | null, popupInterval: NodeJS.Timer

    /**
     * Center the popup on multi-screens
     * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
     */
    const resizePopup = ($window: Window) => {
      const width =
        $window.innerWidth ||
        document.documentElement.clientWidth ||
        $window.screenX
      const height =
        $window.innerHeight ||
        document.documentElement.clientHeight ||
        $window.screenY
      const systemZoom = width / $window.screen.availWidth

      const popupLeft =
        (width - popup.width) / 2 / systemZoom +
        ($window.screenLeft !== undefined
          ? $window.screenLeft
          : $window.screenX)
      const popupTop =
        (height - popup.height) / 2 / systemZoom +
        ($window.screenTop !== undefined ? $window.screenTop : $window.screenY)

      return {
        popupTop,
        popupLeft
      }
    }

    /**
     * Open popup
     */
    const openPopup = () => {
      const $window = window

      const { popupTop, popupLeft } = resizePopup($window)

      // If popup exists, close it
      if (popupWindow && popupInterval) {
        clearInterval(popupInterval)
        popupWindow.close()
      }

      popupWindow = $window.open(
        content,
        `pop-${key}`,
        `height=${popup.height},width=${popup.width},left=${popupLeft},top=${popupTop},screenX=${popupLeft},screenY=${popupTop}`
      )

      if (!popupWindow) return

      popupWindow.focus()

      // Detect if popup closes
      popupInterval = setInterval(() => {
        if (!popupWindow || popupWindow.closed) {
          clearInterval(popupInterval)
          popupWindow = null
        }
      }, 500)
    }

    return openPopup
  }
}
