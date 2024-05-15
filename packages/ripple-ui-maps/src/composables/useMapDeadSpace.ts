import { computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

export default (hasSidepanel, popupType, popup) => {
  const breakpoints = useBreakpoints(bpMin)
  const isMobile = breakpoints.smaller('m')
  const isExtraLargePlus = breakpoints.greaterOrEqual('xl')

  const hasInfoboxPopup = computed(() => {
    return popupType === 'sidebar' && popup.value.isOpen
  })

  const sidePanelWidth = computed(() => {
    const narrowPanelWidth = 260
    const widePanelWidth = 300

    if (!hasSidepanel) {
      return 0
    }

    return isExtraLargePlus.value ? widePanelWidth : narrowPanelWidth
  })

  const infoboxWidth = computed(() => {
    const narrowInfoboxWidth = 260
    const wideInfoboxWidth = 300

    if (!hasInfoboxPopup.value) {
      return 0
    }

    return isExtraLargePlus.value ? wideInfoboxWidth : narrowInfoboxWidth
  })

  const deadSpace = computed(() => {
    if (isMobile.value) {
      // On mobile the infobox has a special design that shows a little bit of the map above it.
      if (hasInfoboxPopup.value && !hasSidepanel) {
        const mobileInfoboxHeight = 350

        return {
          left: 0,
          right: 0,
          bottom: mobileInfoboxHeight,
          top: 0
        }
      }

      return {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }
    }

    return {
      left: sidePanelWidth.value + infoboxWidth.value,
      right: 0,
      bottom: 0,
      top: 0
    }
  })

  return deadSpace
}
