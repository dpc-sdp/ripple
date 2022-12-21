<script lang="ts">
export default { name: 'RplPromoCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplImage from './../image/image.vue'
import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'
import { RplImageType } from '../image/constants'

interface Props {
  el?: typeof RplCardElements[number]
  highlight?: boolean
  image?: RplImageType
  title: string
  url?: string
}

withDefaults(defineProps<Props>(), {
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
        data-cy="image"
        class="rpl-card__media rpl-card__media--round-top"
        v-bind="image"
      />
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
