<script setup lang="ts">
import { computed, inject } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import RplImage from '../image/RplImage.vue'
import RplCard from './RplCard.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import { IRplImageType } from '../image/constants'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  el?: (typeof RplCardElements)[number]
  highlight?: boolean
  image?: IRplImageType
  title: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  el: 'div',
  highlight: false,
  image: undefined,
  url: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-card', emit)

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()

// In SDP sites, the rainbow stripe can be toggled on/off globally via a feature flag.
// This setting will override the highlight prop.
const { hidePromoCardStripe }: IRplFeatureFlags = inject('featureFlags', {
  hidePromoCardStripe: false
})

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: props.title,
      type: 'promo'
    },
    { global: true }
  )
}
</script>

<template>
  <RplCard
    ref="container"
    type="promo"
    :highlight="hidePromoCardStripe ? false : highlight"
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
        sizes="sm:768px"
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
