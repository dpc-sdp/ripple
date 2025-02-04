<script setup lang="ts">
import { computed, useSlots } from 'vue'
import RplHeader from './RplHeader.vue'
import RplImage from '../image/RplImage.vue'
import {
  IRplHeaderLinkExtended,
  IRplHeaderLinksList,
  RplHeaderThemes
} from './constants'
import RplHeaderLinks from './RplHeaderLinks.vue'
import RplHeaderGraphic from './RplHeaderGraphic.vue'
import RplHeaderActions from './RplHeaderActions.vue'
import { RplLink } from '../../lib/constants'
import { IRplImageType } from '../image/constants'
import useEmptySlotCheck from '../../composables/useEmptySlotCheck'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  theme?: (typeof RplHeaderThemes)[number]
  title: string
  logo?: IRplImageType | IRplImageType[]
  background?: IRplImageType
  cornerTop?: string | boolean
  cornerBottom?: string | boolean
  primaryAction?: RplLink
  secondaryAction?: IRplHeaderLinkExtended
  links?: IRplHeaderLinksList
  breadcrumbs?: boolean
  behindNav?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  logo: undefined,
  background: undefined,
  cornerTop: true,
  cornerBottom: true,
  primaryAction: undefined,
  secondaryAction: undefined,
  links: undefined,
  breadcrumbs: false,
  behindNav: false,
  fullWidth: false
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const highlight = computed(
  () => props.theme === 'reverse' || props.theme === 'neutral'
)

const hasActions = computed(
  () => !!(props.primaryAction || props.secondaryAction)
)
const imageCta = computed(() => !!props.background && hasActions.value)

const classes = computed(() => ({
  'rpl-header--hero': true,
  [`rpl-header--${props.theme}`]: props.theme,
  'rpl-header--behind-nav': props.behindNav,
  'rpl-header--breadcrumbs': props.breadcrumbs,
  'rpl-header--graphic-top': props.cornerTop,
  'rpl-header--graphic-bottom': props.cornerBottom,
  'rpl-header--background': props.background && !hasActions.value,
  'rpl-header--image-cta': imageCta.value
}))

const titleClasses = computed(() => ({
  'rpl-header__title': true,
  'rpl-type-h1': !highlight.value,
  'rpl-type-h1-highlight': highlight.value
}))

const contentClasses = computed(() => ({
  'rpl-type-p-large': !highlight.value,
  'rpl-type-p-large-highlight': highlight.value
}))

const backImageRatio = computed(() => {
  return imageCta.value
    ? { xs: 'full', s: 'ultrawide', m: 'wide' }
    : { xs: 'wide', m: 'wide' }
})

const logos = computed((): IRplImageType[] => {
  if (!props.logo) {
    return []
  }
  return Array.isArray(props.logo) ? props.logo : [props.logo]
})

const slots = useSlots()
const defaultSlotIsEmpty = useEmptySlotCheck(slots.default)
const { emitRplEvent, withOptions } = useRippleEvent('rpl-header', emit)

const handleClick = (event) => {
  emitRplEvent(
    'navigate',
    {
      ...event,
      label: props?.title,
      theme: props?.theme,
      options: withOptions(props, [
        'background',
        'primaryAction',
        'secondaryAction',
        'links'
      ]),
      type: 'hero'
    },
    { global: true }
  )
}
</script>

<template>
  <RplHeader :class="classes" :full-width="fullWidth" :limit-content="imageCta">
    <template v-if="background || cornerTop || cornerBottom" #behind>
      <RplImage
        v-if="background"
        v-bind="background"
        priority="high"
        :aspect="backImageRatio"
        sizes="xs:100vw"
      />
      <RplHeaderGraphic v-if="cornerTop" :image="cornerTop" placement="top" />
      <RplHeaderGraphic
        v-if="cornerBottom"
        :image="cornerBottom"
        placement="bottom"
      />
    </template>
    <template v-if="logo" #upper>
      <RplImage
        v-for="image in logos"
        :key="image.src"
        class="rpl-header__logo"
        v-bind="image"
      />
    </template>
    <template #title>
      <h1 :class="titleClasses" data-cy="hero-title">{{ title }}</h1>
    </template>
    <p
      v-if="!defaultSlotIsEmpty"
      :class="contentClasses"
      data-cy="hero-summary"
    >
      <slot></slot>
    </p>
    <template v-if="hasActions" #lower>
      <RplHeaderActions
        :primary="primaryAction"
        :secondary="secondaryAction"
        :variant="imageCta ? 'white' : 'filled'"
        @item-click="handleClick"
      />
    </template>
    <template v-if="links?.items?.length && !background" #aside>
      <RplHeaderLinks
        :title="links?.title"
        :items="
          (links.items || []).map((item) => ({
            ...item,
            icon: item.icon || 'icon-arrow-right'
          }))
        "
        :more-link="links.more"
        @item-click="handleClick"
      />
    </template>
  </RplHeader>
</template>
