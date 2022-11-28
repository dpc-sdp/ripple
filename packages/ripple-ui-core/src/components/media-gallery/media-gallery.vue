<script lang="ts">
export default { name: 'RplMediaGallery' }
</script>

<script setup lang="ts">
import RplMediaGalleryContent from './media-gallery-content.vue'
import RplImage from '../image/image.vue'
import RplPagination from '../pagination/pagination.vue'
import RplModal from '../modal/modal.vue'
import { RplMediaGalleryItem } from './constants'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper'
import { ref } from 'vue'
import 'swiper/css'
import 'swiper/css/effect-fade'

interface Props {
  items: RplMediaGalleryItem[]
}

defineProps<Props>()

const imageSwiper = ref()
const contentSwiper = ref()
const activePage = ref()
const showModal = ref(false)

const paginationClick = (currentPage) => {
  imageSwiper.value.$el.swiper.slideTo(currentPage - 1)
  contentSwiper.value.$el.swiper.slideTo(currentPage - 1)
}

const imageSlideUpdate = ({ activeIndex }) => {
  activePage.value = activeIndex + 1
  contentSwiper.value.$el.swiper.slideTo(activeIndex)
}

const contentSlideUpdate = ({ activeIndex }) => {
  activePage.value = activeIndex + 1
  imageSwiper.value.$el.swiper.slideTo(activeIndex)
}

const toggleModal = (index?: number | undefined) => {
  showModal.value = !showModal.value

  if (index) {
    activePage.value = index + 1
  }
}
</script>

<template>
  <div class="rpl-media-gallery">
    <Swiper
      ref="imageSwiper"
      :space-between="20"
      class="rpl-media-gallery__image"
      @slide-change="imageSlideUpdate"
    >
      <SwiperSlide
        v-for="(item, i) in items"
        :key="i"
        class="rpl-media-gallery__slide"
      >
        <RplImage :src="item.thumbnail" />
      </SwiperSlide>
    </Swiper>

    <RplPagination
      v-if="items.length > 1"
      variant="simple"
      :show-tally="true"
      :current-page="activePage"
      :total-pages="items.length"
      class="rpl-media-gallery__pagination"
      @change="paginationClick"
    />
    <Swiper
      ref="contentSwiper"
      :modules="[EffectFade]"
      effect="fade"
      class="rpl-media-gallery__content"
      @slide-change="contentSlideUpdate"
    >
      <SwiperSlide
        v-for="(item, index) in items"
        :key="index"
        class="rpl-media-gallery__slide"
      >
        <RplMediaGalleryContent
          :title="item.title"
          :caption="item.caption"
          :show-full-screen="true"
          @fullscreen="() => toggleModal(index)"
        />
      </SwiperSlide>
    </Swiper>

    <RplModal :is-open="showModal" @close="toggleModal">
      <Swiper
        ref="imageSwiper"
        :space-between="20"
        :initial-slide="activePage - 1"
        class="rpl-media-gallery__image"
      >
        <SwiperSlide
          v-for="(item, i) in items"
          :key="i"
          class="rpl-media-gallery__slide"
        >
          <RplImage :src="item.image" />
        </SwiperSlide>
      </Swiper>
      <template #below>
        <RplPagination
          v-if="items.length > 1"
          variant="simple"
          :show-tally="true"
          :current-page="activePage"
          :total-pages="items.length"
          class="rpl-media-gallery__pagination"
          @change="paginationClick"
        />
        <Swiper
          ref="contentSwiper"
          :modules="[EffectFade]"
          effect="fade"
          class="rpl-media-gallery__content"
          :initial-slide="activePage - 1"
        >
          <SwiperSlide
            v-for="(item, index) in items"
            :key="index"
            class="rpl-media-gallery__slide"
          >
            <RplMediaGalleryContent
              :title="item.title"
              :caption="item.caption"
            />
          </SwiperSlide>
        </Swiper>
      </template>
    </RplModal>
  </div>
</template>

<style src="./media-gallery.css" />
