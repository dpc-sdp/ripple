<script lang="ts">
export default { name: 'RplProfile' }
</script>

<script setup lang="ts">
import { RplDescriptionListItem } from '../description-list/constants'
import type { ImgHTMLAttributes } from 'vue'
import RplImage from '../image/image.vue'
import RplDescriptionList from '../description-list/description-list.vue'

interface Props {
  image: ImgHTMLAttributes
  items?: Array<RplDescriptionListItem>
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>

<template>
  <div class="rpl-profile">
    <div class="rpl-profile__media">
      <RplImage v-bind="image" circle />
    </div>
    <div v-if="items.length > 0" class="rpl-profile__items">
      <RplDescriptionList :items="items" inline></RplDescriptionList>
    </div>
  </div>
</template>

<style src="./profile.css" />
