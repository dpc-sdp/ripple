<script lang="ts">
export default { name: 'RplProfile' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplProfileItemArray } from './constants'
import type { ImgHTMLAttributes } from 'vue'

defineProps({
  image: {
    type: Object as PropType<ImgHTMLAttributes>,
    required: true
  }, // TODO replace with image component
  items: {
    type: Array as PropType<typeof RplProfileItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-profile">
    <div class="rpl-profile__media">
      <img v-bind="image" />
    </div>
    <div v-if="items.length > 0" class="rpl-profile__items">
      <dl v-for="(item, index) of items" :key="index" class="rpl-profile__item">
        <dt class="rpl-profile__title rpl-type-p">{{ item.title }}</dt>
        <dd class="rpl-profile__content rpl-type-p">{{ item.content }}</dd>
      </dl>
    </div>
  </div>
</template>

<style src="./profile.css" />
