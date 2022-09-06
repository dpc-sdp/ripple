<script lang="ts">
export default { name: 'RplNavCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'
import { RplCardElements } from './constants'

interface Props {
  el?: typeof RplCardElements[number],
  highlight?: boolean,
  image?: string,
  inset?: boolean,
  meta?: string,
  title: string,
  url?: string,
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  highlight: false,
  inset: false,
  image: undefined,
  meta: undefined,
  url: undefined,
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

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="nav" :el="el">
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
        <RplTextLink ref="trigger" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
