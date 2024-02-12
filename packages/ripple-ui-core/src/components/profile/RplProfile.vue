<script setup lang="ts">
import { IRplDescriptionListItem } from '../description-list/constants'
import type { ImgHTMLAttributes } from 'vue'
import RplImage from '../image/RplImage.vue'
import RplDescriptionList from '../description-list/RplDescriptionList.vue'

interface Props {
  image: ImgHTMLAttributes
  items?: Array<IRplDescriptionListItem>
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>

<template>
  <div class="rpl-profile">
    <div class="rpl-profile__media">
      <RplImage
        v-bind="image"
        :aspect="{ xs: 'square', m: 'square' }"
        sizes="xs:148px"
        circle
      />
    </div>
    <div v-if="items.length > 0" class="rpl-profile__items">
      <RplDescriptionList :items="items" inline></RplDescriptionList>
    </div>
  </div>
</template>

<style src="./RplProfile.css" />
