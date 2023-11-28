<template>
  <Transition name="rpl-map-popup">
    <div
      class="rpl-map-popup"
      ref="popupEL"
      :class="{
        [`rpl-map-popup--${type}`]: type,
        [`rpl-map-popup--area`]: isArea
      }"
    >
      <slot name="above">
        <LargePinIcon
          class="rpl-map-popup__large-pin"
          :class="{ [`rpl-map-popup__large-pin--open`]: isOpen }"
          :style="{ fill: `${pinColor}` }"
          v-if="!isArea && isOpen"
        />
      </slot>

      <div v-if="isOpen" class="rpl-map-popup__container">
        <div class="rpl-map-popup__header">
          <h3 :class="`rpl-type-h4`">
            <slot name="header"> </slot>
          </h3>
          <button
            @click="onClose"
            class="rpl-map-popup__close rpl-u-focusable-inline"
          >
            <RplIcon name="icon-cancel" size="s"></RplIcon>
          </button>
        </div>
        <div ref="content" class="rpl-map-popup__body">
          <slot> </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import LargePinIcon from './../../assets/icons/icon-pin-large.svg?component'

interface Props {
  isOpen: boolean
  isArea: boolean
  pinColor?: string
  type?: 'popover' | 'sidebar'
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
  isArea: false,
  pinColor: 'green',
  type: 'sidebar'
})

const emit = defineEmits<{
  (e: 'close', payload: rplEventPayload & { action: 'close' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-popup', emit)
const popupEL = ref()
// const hoverClass = ref('')

function onClose() {
  emitRplEvent('close')
}
</script>
<style src="./RplMapPopUp.css" />
