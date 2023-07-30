<script setup lang="ts">
import RplMediaGalleryContent from './RplMediaGalleryContent.vue'
import RplImage from '../image/RplImage.vue'
import RplSlider from '../slider/RplSlider.vue'
import RplModal from '../modal/RplModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import 'swiper/css'
import 'swiper/css/effect-fade'

interface RplMediaGalleryItem {
  title: string
  alt: string
  image: string
  thumbnail: string
  caption?: string
}

interface Props {
  items: RplMediaGalleryItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'paginate', payload: rplEventPayload & { action: 'prev' | 'next' }): void
  (e: 'swipe', payload: rplEventPayload & { action: 'prev' | 'next' }): void
  (
    e: 'viewFullscreen',
    payload: rplEventPayload & { action: 'enter' | 'exit' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-media-gallery', emit)

const showModal = ref(false)
const activeImageSlide = ref(0)
const activeModalImageSlide = ref(0)
const activeContentSlide = ref(0)
const activeModalContentSlide = ref(0)

const contentSlideUpdate = (event) => {
  activeImageSlide.value = event.value

  handleChange(event)
}

const modalContentSlideUpdate = (event) => {
  activeModalImageSlide.value = event.value

  handleChange(event)
}

const imageSlideUpdate = ({ value }) => {
  activeContentSlide.value = value
}

const modalImageSlideUpdate = ({ value }) => {
  activeModalContentSlide.value = value
}

const handleChange = ({ type, action, text, value }) => {
  emitRplEvent(
    type,
    {
      action,
      text,
      label: props.items[value].title,
      index: value + 1
    },
    { global: true }
  )
}

const toggleModal = ({ text }) => {
  showModal.value = !showModal.value

  if (showModal.value) {
    activeModalImageSlide.value = activeImageSlide.value
    activeModalContentSlide.value = activeContentSlide.value
  }

  emitRplEvent(
    'viewFullscreen',
    {
      action: showModal.value ? 'enter' : 'exit',
      text,
      label: props.items[activeModalImageSlide.value]?.title,
      index: activeImageSlide.value + 1
    },
    { global: true }
  )
}

const keyboardNavigation = (event) => {
  if (!showModal.value) return

  if (event.key === 'ArrowLeft' && activeModalImageSlide.value > 0) {
    activeModalImageSlide.value = activeModalImageSlide.value - 1
  } else if (
    event.key === 'ArrowRight' &&
    activeModalImageSlide.value < props.items.length - 1
  ) {
    activeModalImageSlide.value = activeModalImageSlide.value + 1
  }
}

onMounted(() => {
  window.addEventListener('keydown', keyboardNavigation, false)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyboardNavigation, false)
})
</script>

<template>
  <div class="rpl-media-gallery">
    <RplSlider
      :current-slide="activeImageSlide"
      :show-pagination="false"
      class="rpl-media-gallery__primary-images rpl-u-screen-only"
      data-cy="gallery-images"
      @change="imageSlideUpdate"
    >
      <RplImage
        v-for="(item, i) in items"
        :key="i"
        :src="item.thumbnail"
        :alt="item.alt"
        :aspect="{ xs: 'wide' }"
        sizes="xs:768px"
        data-cy="image"
        class="rpl-media-gallery__image"
      />
    </RplSlider>
    <RplSlider
      effect="fade"
      :show-tally="true"
      :current-slide="activeContentSlide"
      class="rpl-media-gallery__primary-content"
      data-cy="gallery-content"
      @change="contentSlideUpdate"
    >
      <RplMediaGalleryContent
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :caption="item.caption"
        :image="item.image"
        :show-full-screen="true"
        @fullscreen="toggleModal"
      />
    </RplSlider>

    <RplModal
      :is-open="showModal"
      class-name="rpl-media-gallery__modal"
      @close="toggleModal"
    >
      <RplSlider
        :current-slide="activeModalImageSlide"
        :show-pagination="false"
        class="rpl-media-gallery__modal-images"
        @change="modalImageSlideUpdate"
      >
        <RplImage
          v-for="(item, i) in items"
          :key="i"
          :src="item.image"
          :alt="item.alt"
          fit="contain"
          class="rpl-media-gallery__image"
        />
      </RplSlider>
      <template #below>
        <RplSlider
          effect="fade"
          :show-tally="true"
          :current-slide="activeModalContentSlide"
          class="rpl-media-gallery__modal-content"
          @change="modalContentSlideUpdate"
        >
          <RplMediaGalleryContent
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :caption="item.caption"
            :image="item.image"
            :show-full-screen="false"
          />
        </RplSlider>
      </template>
    </RplModal>
  </div>
</template>

<style src="./RplMediaGallery.css" />
