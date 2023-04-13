<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { RplButtonVariants } from '../button/constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './RplCard.vue'
import RplButton from '../button/RplButton.vue'
import RplImage from '../image/RplImage.vue'
import { IRplImageType } from '../image/constants'

interface Props {
  el?: (typeof RplCardElements)[number]
  image?: IRplImageType
  title: string
  url?: string
  ctaText?: string
  variant?: (typeof RplButtonVariants)[number]
}

withDefaults(defineProps<Props>(), {
  el: 'div',
  image: undefined,
  url: undefined,
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
        :rendered="{
          xs: { width: 768 },
          s: { width: 768 },
          m: { width: 768 },
          l: { width: 768 }
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
      data-cy="cta"
    >
      {{ ctaText }}
    </RplButton>
  </RplCard>
</template>
