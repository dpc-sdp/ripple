<script lang="ts">
export default { name: 'RplPromoCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplCard from './card.vue'

defineProps({
  image: {
    type: [String, undefined],
    default: undefined
  },
  highlight: {
    type: Boolean,
    default: false
  },
  meta: {
    type: [String, undefined],
    default: undefined
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const titleClasses = computed(() => {
  return 'rpl-card__cta rpl-type-h3 rpl-u-focusable rpl-u-focusable--inline'
})
</script>

<template>
  <RplCard :href="url" type="promo" :highlight="highlight">
    <template v-if="image" #upper>
      <img class="rpl-card__media" :src="image" alt="" />
    </template>
    <template #meta>
      <div class="rpl-card__meta">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses" role="button" tabindex="0">
        {{ title }}
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
