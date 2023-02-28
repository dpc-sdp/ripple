<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import RplButton from '../button/RplButton.vue'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-modal/close')
const emit = defineEmits(['close'])

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const closeModal = (event) => {
  emit('close')
  rplEventBus.emit('rpl-modal/close', event)
}

const escapeKeyHandler = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal(event)
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    // If running in a browser and isOpen changes toggle viewport locked class
    if (typeof window !== 'undefined') {
      if (newValue) {
        document.body.classList.add('rpl-u-viewport-locked')
      } else {
        document.body.classList.remove('rpl-u-viewport-locked')
      }
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', escapeKeyHandler, false)
})

onUnmounted(() => {
  window.removeEventListener('keydown', escapeKeyHandler, false)
})
</script>

<template>
  <UseFocusTrap v-if="props.isOpen" :options="{ immediate: true }">
    <div class="rpl-modal" data-cy="modal">
      <div class="rpl-modal__inner">
        <slot name="above">
          <div class="rpl-modal__actions">
            <RplButton
              label="Close"
              icon-name="icon-cancel"
              theme="neutral"
              variant="elevated"
              @click="closeModal"
            />
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
</template>

<style src="./RplModal.css" />
