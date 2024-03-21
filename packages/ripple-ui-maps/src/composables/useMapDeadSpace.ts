import { computed, inject } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

export default (hasSidepanel, popupType, popup) => {
  const breakpoints = useBreakpoints(bpMin)
  const isMobile = breakpoints.smaller('m')
  const hasInfoboxPopup = computed(() => {
    return popupType === 'sidebar' && popup.value.isOpen
  })
  const sidePanelWidth = computed(() => {
    return hasSidepanel ? 300 : 0
  })
  const infoboxWidth = computed(() => {
    return hasInfoboxPopup.value ? 340 : 0
  })

  const deadSpace = computed(() => {
    if (isMobile.value) {
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
