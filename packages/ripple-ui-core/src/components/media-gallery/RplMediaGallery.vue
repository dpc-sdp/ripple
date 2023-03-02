<script setup lang="ts">
import RplMediaGalleryContent from './RplMediaGalleryContent.vue'
import RplImage from '../image/RplImage.vue'
import RplSlider from '../slider/RplSlider.vue'
import RplModal from '../modal/RplModal.vue'
import { ref } from 'vue'
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

defineProps<Props>()

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
        aspect="wide"
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
      class="rpl-media-gallery__modal"
      :is-open="showModal"
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
          class="rpl-media-gallery__image"
        />
      </RplSlider>
      <template #below>
        <RplSlider
          effect="fade"
          :show-tally="true"
          :current-slide="activeContentSlide"
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
