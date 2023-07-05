<script setup lang="ts">
import RplButton from '../button/RplButton.vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import RplImage from '../image/RplImage.vue'
import { computed } from 'vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title: string
  caption?: string
  image?: string
  showFullScreen: boolean
}

const props = withDefaults(defineProps<Props>(), {
  caption: undefined,
  image: undefined,
  showFullScreen: false
})

const emit = defineEmits<{
  (e: 'fullscreen', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-media-gallery', emit)

const fullScreenLabel = computed(() => `View '${props.title}' fullscreen`)

const onFullScreen = () => {
  emitRplEvent(
    'fullscreen',
    {
      action: 'click',
      text: fullScreenLabel.value,
      name: props.title
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-media-gallery__content">
    <RplImage
      v-if="image"
      :src="image"
      :aspect="{ xs: 'wide' }"
      sizes="xs:768px"
      alt=""
      class="rpl-media-gallery__image rpl-u-print-only"
    />
    <h3 class="rpl-type-h3 rpl-u-margin-b-2" data-cy="title">{{ title }}</h3>
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
      >{{ fullScreenLabel }}</RplButton
    >
  </div>
</template>
