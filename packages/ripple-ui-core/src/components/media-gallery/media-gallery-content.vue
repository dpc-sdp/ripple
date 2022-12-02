<script lang="ts">
export default { name: 'RplMediaGalleryContent' }
</script>

<script setup lang="ts">
import RplButton from '../button/button.vue'
import { rplEventBus } from '../../index'
import 'swiper/css'
import 'swiper/css/effect-fade'

rplEventBus.register('rpl-media-gallery/fullscreen')
const emit = defineEmits(['fullscreen'])

interface Props {
  title: string
  caption?: string
  showFullScreen: boolean
}

withDefaults(defineProps<Props>(), {
  caption: undefined,
  showFullScreen: false
})

const onFullScreen = (event) => {
  rplEventBus.emit('rpl-gallery/fullscreen', event)
  emit('fullscreen', event)
}
</script>

<template>
  <div class="rpl-media-gallery__content">
    <h3 class="rpl-type-h3 rpl-u-margin-b-1">{{ title }}</h3>
    <p v-if="caption" class="rpl-media-gallery__caption rpl-type-p">
      {{ caption }}
    </p>
    <RplButton
      v-if="showFullScreen"
      variant="none"
      class="rpl-media-gallery__button"
      icon-name="icon-enlarge-square-filled"
      icon-position="left"
      theme="default"
      @click="onFullScreen"
    >
      View '{{ title }}' fullscreen
    </RplButton>
  </div>
</template>

<style src="./media-gallery.css" />
