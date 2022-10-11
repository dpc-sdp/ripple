<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplHeader from './header.vue'
import RplImage from '../image/image.vue'
import {
  RplHeaderLinkExtended,
  RplHeaderLinksList,
  RplHeaderThemes
} from './constants'
import RplHeaderLinks from './header-links.vue'
import RplHeaderGraphic from './header-graphic.vue'
import RplHeaderActions from './header-actions.vue'
import { RplLink } from '../../lib/constants'
import { RplImageType } from '../image/constants'

interface Props {
  theme?: typeof RplHeaderThemes[number]
  title: string
  logo?: RplImageType
  background?: RplImageType
  cornerTop?: boolean
  cornerBottom?: boolean
  primaryAction?: RplLink
  secondaryAction?: RplHeaderLinkExtended
  links?: RplHeaderLinksList
  breadcrumbs?: boolean
  behindNav?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  logo: undefined,
  background: undefined,
  cornerTop: false,
  cornerBottom: false,
  primaryAction: undefined,
  secondaryAction: undefined,
  links: undefined,
  breadcrumbs: false,
  behindNav: false
})

const highlight = computed(
  () => props.theme === 'reverse' || props.theme === 'neutral'
)

const classes = computed(() => ({
  'rpl-header--hero': true,
  [`rpl-header--${props.theme}`]: props.theme,
  'rpl-header--behind-nav': props.behindNav,
  'rpl-header--breadcrumbs': props.breadcrumbs,
  'rpl-header--graphic-top': props.cornerTop,
  'rpl-header--graphic-bottom': props.cornerBottom
}))

const titleClasses = computed(() => ({
  'rpl-header__title': true,
  'rpl-type-h1': !highlight.value,
  'rpl-type-h1-highlight': highlight.value
}))

const contentClasses = computed(() => ({
  'rpl-type-p-large': true,
  'rpl-type-p-highlight': highlight.value
}))
</script>

<template>
  <RplHeader :class="classes">
    <template v-if="background || cornerTop || cornerBottom" #behind>
      <RplImage v-if="background" v-bind="background" priority="high" />
      <RplHeaderGraphic v-if="cornerTop" :image="cornerTop" placement="top" />
      <RplHeaderGraphic
        v-if="cornerBottom"
        :image="cornerBottom"
        placement="bottom"
      />
    </template>
    <template v-if="logo && !background" #upper>
      <RplImage class="rpl-header__logo" v-bind="logo" />
    </template>
    <template #title>
      <h1 :class="titleClasses" data-cy="title">{{ title }}</h1>
    </template>
    <p v-if="$slots.default" :class="contentClasses">
      <slot></slot>
    </p>
    <template v-if="(primaryAction || secondaryAction) && !background" #lower>
      <RplHeaderActions :primary="primaryAction" :secondary="secondaryAction" />
    </template>
    <template v-if="links && !background" #aside>
      <RplHeaderLinks
        :title="links?.title"
        :items="links.items"
        :more-link="links.more"
      />
    </template>
  </RplHeader>
</template>
