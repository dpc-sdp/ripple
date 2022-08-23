<script lang="ts">
export default { name: 'RplPromoCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

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

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="promo" :highlight="highlight" :el="el">
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
        <RplTextLink ref="trigger" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
