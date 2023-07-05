<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplImage from '../image/RplImage.vue'
import { IRplImageType } from '../image/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  el?: (typeof RplCardElements)[number]
  image: IRplImageType
  title: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  url: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card', emit)

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: props.title,
      type: 'category-grid'
    },
    { global: true }
  )
}
</script>

<template>
  <RplCard
    ref="container"
    :link="url"
    :el="el"
    :highlight="false"
    type="category-grid"
  >
    <template #upper>
      <RplImage
        class="rpl-card__media rpl-card__media--category-grid"
        v-bind="image"
        :aspect="{ xs: 'square' }"
        sizes="xs:52px"
        alt=""
        data-cy="image"
      />
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="trigger" :url="url" @click="handleClick">
          {{ title }}
        </RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
