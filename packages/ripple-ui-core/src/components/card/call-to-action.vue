<script lang="ts">
export default { name: 'RplCallToAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { RplButtonThemes, RplButtonVariants } from '../button/constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplButton from '../button/button.vue'
import RplImage from '../image/image.vue'
import { RplImageType } from '../image/constants'

interface Props {
  el?: typeof RplCardElements[number]
  image?: RplImageType
  title: string
  url?: string
  ctaText?: string
  theme?: typeof RplButtonThemes[number]
  variant?: typeof RplButtonVariants[number]
}

withDefaults(defineProps<Props>(), {
  el: 'div',
  image: undefined,
  url: undefined,
  theme: 'default',
  variant: 'filled',
  ctaText: 'Call to action'
})

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard
    ref="container"
    type="call-to-action"
    class="rpl-card--inset"
    :link="url"
    :el="el"
  >
    <template v-if="image" #upper>
      <RplImage
        v-bind="image"
        class="rpl-card__media rpl-card__media--inset"
        :aspect="{
          xs: 'wide',
          s: 'ultrawide',
          m: 'panorama',
          l: 'full'
        }"
        data-cy="image"
      />
    </template>
    <template #title>
      <h3 :class="titleClasses" data-cy="title">{{ title }}</h3>
    </template>
    <slot></slot>
    <RplButton
      ref="trigger"
      el="a"
      :url="url"
      role="button"
      :variant="variant"
      :theme="theme"
      data-cy="cta"
    >
      {{ ctaText }}
    </RplButton>
  </RplCard>
</template>
