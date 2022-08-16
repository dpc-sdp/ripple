<script lang="ts">
export default { name: 'RplNavCard' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { useContainerTrigger } from '../../composables/useContainerTrigger'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

const props = defineProps({
  el: RplPropEl,
  highlight: {
    type: Boolean,
    default: false
  },
  image: {
    type: [String, undefined],
    default: undefined
  },
  inset: {
    type: Boolean,
    default: true
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

const titleClasses = computed(() => [
  'rpl-card__cta',
  props.highlight ? 'rpl-type-h3-highlight' : 'rpl-type-h3',
  'rpl-u-focusable',
  'rpl-u-focusable--inline'
])

const imgClasses = computed(() => [
  'rpl-card__media',
  props.inset ? 'rpl-card__media--inset' : null
])

const card = ref(null)
const callToAction = ref(null)
useContainerTrigger(card, callToAction)
</script>

<template>
  <RplCard ref="card" type="nav" :el="el">
    <template v-if="image" #upper>
      <img :class="imgClasses" :src="image" alt="" />
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
