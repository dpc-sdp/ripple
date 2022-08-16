<script lang="ts">
export default { name: 'RplCategoryGridCard' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useContainerTrigger } from '../../composables/useContainerTrigger'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  el: RplPropEl,
  image: RplPropStringRequired,
  title: RplPropStringRequired,
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const titleClasses = computed(() => RplCardTitleClasses)

const card = ref(null)
const callToAction = ref(null)
useContainerTrigger(card, callToAction)
</script>

<template>
  <RplCard ref="card" :href="url" :el="el" type="category-grid">
    <template #upper>
      <img
        class="rpl-card__media rpl-card__media--category-grid"
        :src="image"
        alt=""
      />
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="callToAction" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
