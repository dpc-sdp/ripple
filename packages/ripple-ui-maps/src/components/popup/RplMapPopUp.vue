<template>
  <Transition name="rpl-map-popup">
    <div
      v-if="isOpen"
      ref="popupEL"
      tabIndex="-1"
      class="rpl-map-popup"
      :class="{
        [`rpl-map-popup--${type}`]: type,
        [`rpl-map-popup--area`]: isArea
      }"
      :style="{
        '--local-map-height': `${mapHeight}px`,
        '--local-popup-header-height': `${headerHeight}px`,
        '--local-popup-body-height':
          type === 'popover' ? `${bodyHeight}px` : undefined
      }"
    >
      <slot v-if="type === 'popover'" name="above">
        <LargePinIcon
          v-if="!isArea && isOpen"
          class="rpl-map-popup__large-pin"
          :class="{ [`rpl-map-popup__large-pin--open`]: isOpen }"
          :style="{ fill: `${pinColor}` }"
        />
      </slot>

      <div v-if="isOpen" class="rpl-map-popup__container">
        <div ref="headerRef" class="rpl-map-popup__header">
          <button
            v-if="type === 'standalone'"
            class="rpl-map-popup__close rpl-u-focusable-block"
            aria-label="Close"
            @click="onClose"
          >
            <RplIcon name="icon-arrow-left" size="s" colour="primary"></RplIcon>
          </button>
          <h3 class="rpl-type-h4-fixed">
            <slot name="header"> </slot>
          </h3>
          <button
            v-if="type !== 'standalone'"
            class="rpl-map-popup__close rpl-u-focusable-block"
            aria-label="Close"
            @click="onClose"
          >
            <RplIcon name="icon-cancel" size="s" colour="primary"></RplIcon>
          </button>
        </div>
        <div class="rpl-map-pop-up-scroll-container">
          <div ref="content" class="rpl-map-popup__body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import {
  useResizeObserver,
  useBreakpoints,
  onClickOutside,
  onKeyStroke
} from '@vueuse/core'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import { useRippleEvent, bpMin } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import LargePinIcon from './../../assets/icons/icon-pin-large.svg?component'

interface Props {
  featureId: string
  isOpen: boolean
  isArea?: boolean
  pinColor?: string
  type?: 'standalone' | 'popover' | 'sidebar' | 'layerlist'
  mapHeight?: number
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  isArea: false,
  pinColor: 'green',
  type: 'sidebar',
  mapHeight: 600,
  closeOnClickOutside: false,
  closeOnEscape: false
})

const emit = defineEmits<{
  (e: 'close', payload: rplEventPayload & { action: 'close' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-popup', emit)
const popupEL = ref()
const previouslyFocused = ref<Element>(null)

function onClose() {
  // Return focus to where the popup was originally opened from, if the element is still in the dom
  if (
    previouslyFocused.value &&
    previouslyFocused.value instanceof HTMLElement
  ) {
    previouslyFocused.value.focus({ preventScroll: true })
  }

  emitRplEvent('close')
}

if (props.closeOnClickOutside) {
  onClickOutside(popupEL, onClose)
}

if (props.closeOnEscape) {
  onKeyStroke(['Escape'], onClose)
}

const breakpoints = useBreakpoints(bpMin)
const isLargePlus = breakpoints.greaterOrEqual('l')

const headerRef = ref(null)
const headerHeight = ref(80)

useResizeObserver(headerRef, (entries) => {
  const entry = entries[0]
  headerHeight.value = entry.borderBoxSize[0].blockSize
})

const bodyHeight = computed(() => {
  // 360px is the maximum height of the whole popover type popup as per the design
  const maxPopupHeight = 360

  // If we can't fit the whole popup, calculate the largest height that will fit, taking into account padding and borders
  // The 'popover' type popup doesn't emanate from the centre of the map, it's offset slightly
  const popoverYOffset = 100 - (isLargePlus.value ? 8 : 4)
  const mapPadding = isLargePlus.value ? 12 : 8
  const borderPixels = 2
  const availablePopupHeight =
    props.mapHeight / 2 + popoverYOffset - mapPadding - borderPixels

  // Choose the smaller of the max height and available space to get the body height
  return Math.min(maxPopupHeight, availablePopupHeight) - headerHeight.value
})

// Watch the featureId and isOpen to know when the popup is opened or has updated with new data.
// Anytime this happens we want to bring focus to the popup and remember the previously focused element
// so that we can return there when the popup is closed.
watch([() => props.isOpen, () => props.featureId], async (newIsOpen) => {
  if (newIsOpen) {
    previouslyFocused.value = document.activeElement

    await nextTick()
    popupEL.value?.focus({ preventScroll: true })
  }
})
</script>
<style src="./RplMapPopUp.css" />
