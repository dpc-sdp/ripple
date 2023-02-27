<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplImage from '../image/RplImage.vue'
import { RplImageType } from '../image/constants'
import usePrintUrl from '../../composables/usePrintUrl'

interface Props {
  el?: (typeof RplCardElements)[number]
  image: RplImageType
  title: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  url: undefined
})

const titleClasses = computed(() => RplCardTitleClasses)

const printUrl = usePrintUrl(props.url)
const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard
    ref="container"
    :link="url"
    :el="el"
    :highlight="false"
    type="category-grid"
    :data-print-url="printUrl"
  >
    <template #upper>
      <RplImage
        class="rpl-card__media rpl-card__media--category-grid"
        v-bind="image"
        data-cy="image"
      />
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="trigger" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
