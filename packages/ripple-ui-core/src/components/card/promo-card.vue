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

interface Props {
  el?: typeof RplCardElements[number]
  highlight?: boolean
  image?: string
  meta?: string
  title: string
  url?: string
}

withDefaults(defineProps<Props>(), {
  el: 'div',
  highlight: false,
  image: undefined,
  meta: undefined,
  url: undefined
})

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="promo" :highlight="highlight" :el="el">
    <template v-if="image" #upper>
      <RplImage
        class="rpl-card__media"
        :src="image"
        alt=""
        :aspect="{
          xs: 'wide',
          s: 'ultrawide',
          m: 'wide'
        }"
      />
    </template>
    <template v-if="meta" #meta>
      <div class="rpl-card__meta rpl-type-label-small">
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
