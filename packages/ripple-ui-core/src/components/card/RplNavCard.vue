<script setup lang="ts">
import { computed } from 'vue'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplImage from '../image/RplImage.vue'
import { RplCardElements } from './constants'
import { IRplImageType } from '../image/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

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

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card', emit)

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

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: props.title,
      type: 'nav'
    },
    { global: true }
  )
}
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
        sizes="xs:768px"
        alt=""
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
        <RplTextLink ref="trigger" :url="url" @click="handleClick">
          {{ title }}
        </RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
