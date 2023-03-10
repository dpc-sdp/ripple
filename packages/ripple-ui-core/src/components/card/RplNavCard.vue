<script setup lang="ts">
import { computed } from 'vue'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplImage from '../image/RplImage.vue'
import { RplCardElements } from './constants'
import { IRplImageType } from '../image/constants'

interface Props {
  el?: (typeof RplCardElements)[number]
  highlight?: boolean
  image?: IRplImageType
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
  props.highlight ? 'rpl-type-h3-highlight' : 'rpl-type-h3'
])

const imgClasses = computed(() => [
  'rpl-card__media',
  props.inset ? 'rpl-card__media--inset' : null
])

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="nav" :el="el" :link="url" :class="cardClasses">
    <template v-if="image" #upper>
      <RplImage
        v-bind="image"
        :class="imgClasses"
        :aspect="{
          xs: 'wide',
          s: 'ultrawide',
          m: 'panorama',
          l: highlight ? 'panorama' : 'full'
        }"
        data-cy="image"
      />
    </template>
    <template v-if="$slots.meta" #meta>
      <div class="rpl-card__meta rpl-type-label-small">
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
