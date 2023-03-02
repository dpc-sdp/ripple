<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplImage from '../image/RplImage.vue'
import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import { RplImageType } from '../image/constants'

interface Props {
  el?: (typeof RplCardElements)[number]
  highlight?: boolean
  image?: RplImageType
  title: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  highlight: false,
  image: undefined,
  url: undefined
})

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard
    ref="container"
    type="promo"
    :highlight="highlight"
    :link="url"
    :el="el"
  >
    <template v-if="image" #upper>
      <RplImage
        v-bind="image"
        class="rpl-card__media"
        :aspect="{
          xs: 'wide',
          s: 'ultrawide',
          m: 'wide'
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
