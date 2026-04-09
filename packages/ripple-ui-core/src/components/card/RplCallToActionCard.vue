<script setup lang="ts">
import { RplCardElements } from './constants'
import { RplButtonVariants } from '../button/constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplCard from './RplCard.vue'
import RplButton from '../button/vue/RplButton.vue'
import RplImage from '../image/RplImage.vue'
import { IRplImageType } from '../image/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  el?: (typeof RplCardElements)[number]
  image?: IRplImageType
  title: string
  url?: string
  ctaText?: string
  variant?: (typeof RplButtonVariants)[number]
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  image: undefined,
  url: undefined,
  variant: 'filled',
  ctaText: 'Call to action'
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card', emit)

// Underscore prefixes to avoid unused variable typescript error, as these are only used in template refs.
const { container: _container, trigger: _trigger } = useAccessibleContainer()

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      label: props.title,
      text: props.ctaText,
      type: 'call-to-action'
    },
    { global: true }
  )
}
</script>

<template>
  <RplCard
    ref="_container"
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
        sizes="xs:768px"
        data-cy="image"
      />
    </template>
    <template #title>
      <h3 class="rpl-card__cta rpl-type-h3" data-cy="title">{{ title }}</h3>
    </template>
    <slot></slot>
    <RplButton
      ref="_trigger"
      el="a"
      :url="url"
      role="button"
      :variant="variant"
      data-cy="cta"
      @click="handleClick"
    >
      {{ ctaText }}
    </RplButton>
  </RplCard>
</template>
