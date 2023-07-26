<script setup lang="ts">
import RplMediaGalleryContent from './RplMediaGalleryContent.vue'
import RplImage from '../image/RplImage.vue'
import RplSlider from '../slider/RplSlider.vue'
import RplModal from '../modal/RplModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
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

const showModal = ref(false)
const activeImageSlide = ref(0)
const activeContentSlide = ref(0)

const contentSlideUpdate = (currentPage) => {
  activeImageSlide.value = currentPage
}

const imageSlideUpdate = (currentPage) => {
  activeContentSlide.value = currentPage
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const keyboardNavigation = (event) => {
  if (!showModal.value) return

  if (event.key === 'ArrowLeft' && activeImageSlide.value > 0) {
    activeImageSlide.value = activeImageSlide.value - 1
  } else if (
    event.key === 'ArrowRight' &&
    activeImageSlide.value < props.items.length - 1
  ) {
    activeImageSlide.value = activeImageSlide.value + 1
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
        :current-slide="activeImageSlide"
        :show-pagination="false"
        class="rpl-media-gallery__modal-images"
        @change="imageSlideUpdate"
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
          :current-slide="activeContentSlide"
          class="rpl-media-gallery__modal-content"
          @change="contentSlideUpdate"
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
