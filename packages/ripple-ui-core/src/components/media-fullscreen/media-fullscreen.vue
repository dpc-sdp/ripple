<script lang="ts">
export default { name: 'RplMediaFullscreen' }
</script>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import RplImage from '../image/image.vue'
import RplButton from '../button/button.vue'

interface Props {
  title: string
  src: string
  caption?: string
  isOpen: boolean
  onCloseClick: () => void
}

const props = withDefaults(defineProps<Props>(), {
  caption: undefined
})

const escapeKeyHandler = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    props.onCloseClick()
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    // If running in a browser and isOpen changes toggle viewport locked class
    if (typeof window !== 'undefined') {
      if (newValue) {
        document.body.classList.add('rpl-viewport-locked')
      } else {
        document.body.classList.remove('rpl-viewport-locked')
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
    <div class="rpl-media-fullscreen">
      <div class="rpl-media-fullscreen__inner">
        <div class="rpl-media-fullscreen__actions">
          <RplButton
            label="Close"
            icon-name="icon-cancel"
            theme="neutral"
            variant="elevated"
            @click="props.onCloseClick"
          />
        </div>

        <div class="rpl-media-fullscreen__image-wrapper">
          <RplImage
            :src="props.src"
            :alt="props.caption"
            class="rpl-media-fullscreen__image"
          />
        </div>

        <div class="rpl-media-fullscreen__caption">
          <h3 class="rpl-type-h3 rpl-u-margin-b-2">{{ props.title }}</h3>
          <p class="rpl-type-p">{{ props.caption }}</p>
        </div>
      </div>
    </div>
  </UseFocusTrap>
</template>

<style src="./media-fullscreen.css" />
