<script lang="ts">
export default { name: 'RplMediaGallery' }
</script>

<script setup lang="ts">
import RplMediaGalleryContent from './media-gallery-content.vue'
import RplImage from '../image/image.vue'
import RplSlider from '../slider/slider.vue'
import RplModal from '../modal/modal.vue'
import { RplMediaGalleryItem } from './constants'
import { ref } from 'vue'
import 'swiper/css'
import 'swiper/css/effect-fade'

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
      @change="imageSlideUpdate"
    >
      <RplImage
        v-for="(item, i) in items"
        :key="i"
        :src="item.thumbnail"
        class="rpl-media-gallery__image"
      />
    </RplSlider>
    <RplSlider
      effect="fade"
      :show-tally="true"
      :auto-height="true"
      :current-slide="activeContentSlide"
      @change="contentSlideUpdate"
    >
      <RplMediaGalleryContent
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :caption="item.caption"
        :show-full-screen="true"
        @fullscreen="toggleModal"
      />
    </RplSlider>

    <RplModal :is-open="showModal" @close="toggleModal">
      <RplSlider
        :current-slide="activeImageSlide"
        :show-pagination="false"
        @change="imageSlideUpdate"
      >
        <RplImage v-for="(item, i) in items" :key="i" :src="item.thumbnail" />
      </RplSlider>
      <template #below>
        <RplSlider
          effect="fade"
          :show-tally="true"
          :auto-height="true"
          :current-slide="activeContentSlide"
          @change="contentSlideUpdate"
        >
          <RplMediaGalleryContent
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :caption="item.caption"
            :show-full-screen="false"
          />
        </RplSlider>
      </template>
    </RplModal>
  </div>
</template>

<style src="./media-gallery.css" />
