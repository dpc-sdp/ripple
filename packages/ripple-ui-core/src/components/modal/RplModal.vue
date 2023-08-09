<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import RplButton from '../button/RplButton.vue'
import { useWindowSize } from '@vueuse/core'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  isOpen: boolean
  className?: string
  closeLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: undefined,
  closeLabel: 'Close'
})

const emit = defineEmits<{
  (e: 'close', payload: rplEventPayload & { action: 'click' }): void
}>()

const { height } = useWindowSize()
const { emitRplEvent } = useRippleEvent('rpl-modal', emit)

const closeModal = () => {
  emitRplEvent('close', {
    action: 'click',
    text: props.closeLabel
  })
}

const escapeKeyHandler = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    // If running in a browser and isOpen changes toggle viewport locked class
    if (typeof window !== 'undefined') {
      if (newValue) {
        document.body.classList.add('rpl-u-viewport-locked', 'rpl-modal-open')
      } else {
        document.body.classList.remove(
          'rpl-u-viewport-locked',
          'rpl-modal-open'
        )
      }
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', escapeKeyHandler, false)
})

onUnmounted(() => {
  window.removeEventListener('keydown', escapeKeyHandler, false)
  document.body.classList.remove('rpl-u-viewport-locked', 'rpl-modal-open')
})
</script>

<template>
  <teleport to="body">
    <UseFocusTrap v-if="isOpen" :options="{ immediate: true }">
      <div
        :class="`rpl-modal ${className}`"
        data-cy="modal"
        v-bind="$attrs"
        :style="`--local-view-height: ${height}px`"
      >
        <div class="rpl-modal__inner">
          <slot name="above">
            <div class="rpl-modal__actions">
              <RplButton
                icon-name="icon-cancel"
                theme="neutral"
                variant="elevated"
                @click="closeModal"
              >
                {{ closeLabel }}
              </RplButton>
            </div>
          </slot>
          <div class="rpl-modal__main">
            <slot />
          </div>
          <div v-if="$slots.below" class="rpl-modal__below">
            <slot name="below" />
          </div>
        </div>
      </div>
    </UseFocusTrap>
  </teleport>
</template>

<style src="./RplModal.css" />
