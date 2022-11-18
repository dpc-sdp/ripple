<script lang="ts">
export default { name: 'RplNavCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'
import RplImage from './../image/image.vue'
import { RplCardElements } from './constants'

interface Props {
  el?: typeof RplCardElements[number]
  highlight?: boolean
  image?: string
  inset?: boolean
  title: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  highlight: false,
  inset: false,
  image: undefined,
  url: undefined
})

const cardClasses = computed(() => ({
  'rpl-card--inset': props.inset
}))

const titleClasses = computed(() => [
  'rpl-card__cta',
  props.highlight ? 'rpl-type-h3-highlight' : 'rpl-type-h3',
  'rpl-u-focusable-inline'
])

const imgClasses = computed(() => [
  'rpl-card__media',
  props.highlight ? 'rpl-card__media--round-top' : null,
  props.inset ? 'rpl-card__media--inset' : null
])

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="nav" :el="el" :class="cardClasses">
    <template v-if="image" #upper>
      <RplImage :class="imgClasses" :src="image" alt="" data-cy="image" />
    </template>
    <template v-if="$slots.meta" #meta>
      <div class="rpl-card__meta rpl-type-p-small">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses" data-cy="title">
        <RplTextLink ref="trigger" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
