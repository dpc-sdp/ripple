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
  logo?: IRplImageType
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

const classes = computed(() => ({
  'rpl-header--hero': true,
  [`rpl-header--${props.theme}`]: props.theme,
  'rpl-header--behind-nav': props.behindNav,
  'rpl-header--breadcrumbs': props.breadcrumbs,
  'rpl-header--graphic-top': props.cornerTop,
  'rpl-header--graphic-bottom': props.cornerBottom,
  'rpl-header--background': props.background
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

const slots = useSlots()
const defaultSlotIsEmpty = useEmptySlotCheck(slots.default)
const { emitRplEvent } = useRippleEvent('rpl-header', emit)

const handleClick = (event) => {
  emitRplEvent(
    'navigate',
    {
      ...event,
      type: 'hero'
    },
    { global: true }
  )
}
</script>

<template>
  <RplHeader :class="classes" :full-width="fullWidth">
    <template v-if="background || cornerTop || cornerBottom" #behind>
      <RplImage
        v-if="background"
        v-bind="background"
        priority="high"
        :aspect="{ xs: 'wide', m: 'wide' }"
        sizes="xs:100vw"
        alt=""
      />
      <RplHeaderGraphic v-if="cornerTop" :image="cornerTop" placement="top" />
      <RplHeaderGraphic
        v-if="cornerBottom"
        :image="cornerBottom"
        placement="bottom"
      />
    </template>
    <template v-if="logo" #upper>
      <RplImage class="rpl-header__logo" v-bind="logo" alt="" />
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
    <template v-if="(primaryAction || secondaryAction) && !background" #lower>
      <RplHeaderActions :primary="primaryAction" :secondary="secondaryAction" />
    </template>
    <template v-if="links && !background" #aside>
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
