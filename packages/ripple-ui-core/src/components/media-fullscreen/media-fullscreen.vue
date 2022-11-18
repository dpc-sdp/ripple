<script lang="ts">
export default { name: 'RplMediaFullscreen' }
</script>

<script setup lang="ts">
import { watch } from 'vue'
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
</script>

<template>
  <div v-if="props.isOpen" class="rpl-media-fullscreen">
    <div class="rpl-media-fullscreen__actions">
      <RplButton
        label="Close"
        icon-name="icon-cancel"
        theme="neutral"
        variant="elevated"
        @click="props.onCloseClick"
      />
    </div>

    <div class="rpl-media-fullscreen__media">
      <iframe
        class="rpl-media-embed__iframe"
        :title="props.title"
        :src="props.src"
      ></iframe>
    </div>

    <div class="rpl-media-fullscreen__caption">
      <h3 class="rpl-type-h3 rpl-u-margin-b-2">{{ props.title }}</h3>
      <p class="rpl-type-p">{{ props.caption }}</p>
    </div>
  </div>
</template>

<style src="./media-fullscreen.css" />
