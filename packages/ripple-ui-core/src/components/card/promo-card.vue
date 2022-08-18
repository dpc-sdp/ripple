<script lang="ts">
export default { name: 'RplPromoCard' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useAccessibleCardPattern } from '../../composables/useAccessibleCardPattern'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  el: RplPropEl,
  highlight: {
    type: Boolean,
    default: false
  },
  image: {
    type: [String, undefined],
    default: undefined
  },
  meta: {
    type: [String, undefined],
    default: undefined
  },
  title: RplPropStringRequired,
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const titleClasses = computed(() => RplCardTitleClasses)

const callToAction = ref(null)
useAccessibleCardPattern(callToAction)
</script>

<template>
  <RplCard type="promo" :highlight="highlight" :el="el">
    <template v-if="image" #upper>
      <img class="rpl-card__media" :src="image" alt="" />
    </template>
    <template #meta>
      <div class="rpl-card__meta">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="callToAction" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
