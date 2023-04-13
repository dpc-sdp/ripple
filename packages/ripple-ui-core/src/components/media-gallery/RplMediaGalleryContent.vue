<script setup lang="ts">
import RplButton from '../button/RplButton.vue'
import { rplEventBus } from '../../index'
import 'swiper/css'
import 'swiper/css/effect-fade'
import RplImage from '../image/RplImage.vue'

rplEventBus.register('rpl-media-gallery/fullscreen')
const emit = defineEmits(['fullscreen'])

interface Props {
  title: string
  caption?: string
  image?: string
  showFullScreen: boolean
}

withDefaults(defineProps<Props>(), {
  caption: undefined,
  image: undefined,
  showFullScreen: false
})

const onFullScreen = (event) => {
  rplEventBus.emit('rpl-gallery/fullscreen', event)
  emit('fullscreen', event)
}
</script>

<template>
  <div class="rpl-media-gallery__content">
    <RplImage
      v-if="image"
      :src="image"
      :aspect="{ xs: 'wide' }"
      class="rpl-media-gallery__image rpl-u-print-only"
    />
    <h3 class="rpl-type-h3 rpl-u-margin-b-1" data-cy="title">{{ title }}</h3>
    <p
      v-if="caption"
      class="rpl-media-gallery__caption rpl-type-p"
      data-cy="caption"
    >
      {{ caption }}
    </p>
    <RplButton
      v-if="showFullScreen"
      variant="none"
      class="rpl-media-gallery__button rpl-u-screen-only"
      icon-name="icon-enlarge-square-filled"
      icon-position="left"
      theme="default"
      @click="onFullScreen"
    >
      View '{{ title }}' fullscreen
    </RplButton>
  </div>
</template>
