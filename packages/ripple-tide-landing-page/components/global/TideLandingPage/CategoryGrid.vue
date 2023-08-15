<script setup lang="ts">
import { computed } from 'vue'
import { ITideCompactCard } from '../../../mapping/components/compact-cards/compact-cards-mapping'

const props = defineProps<{
  items: ITideCompactCard[]
  hasSidebar: boolean
  hasTitle: boolean
}>()

const columns = computed(() => {
  let classes = 'rpl-col-12 rpl-col-6-s'

  if (props.hasSidebar) {
    return `${classes} rpl-col-7-m rpl-col-3-xl`
  }

  return `${classes} rpl-col-4-l rpl-col-3-xl`
})
</script>

<template>
  <ul
    :class="{
      'rpl-grid': true,
      'tide-category-grid--has-title': hasTitle
    }"
  >
    <RplCategoryGridCard
      v-for="(item, index) of items"
      :key="index"
      el="li"
      :image="item?.image"
      :url="item.url"
      :title="item.title"
      :class="columns"
    >
      <p v-if="item.summary">{{ item.summary }}</p>
    </RplCategoryGridCard>
  </ul>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-category-grid--has-title {
  margin-top: var(--rpl-sp-6);

  @media (--rpl-bp-l) {
    margin-top: var(--rpl-sp-7);
  }
}
</style>
