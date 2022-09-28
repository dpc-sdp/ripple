<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplHeader from './header.vue'
import RplImage from '../image/image.vue'
import { ContextLink, CoreLink, Links, RplHeaderThemes } from './constants'
import RplHeaderLinks from './header-links.vue'
import RplHeaderGraphic from './header-graphic.vue'
import RplHeaderActions from './header-actions.vue'

interface Props {
  theme?: RplHeaderThemes[number]
  title: string
  logo?: string
  background?: object // TODO
  cornerTop?: boolean
  cornerBottom?: boolean
  content?: string
  primaryAction: CoreLink // TODO
  secondaryAction: ContextLink
  links?: Links[]
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  logo: undefined,
  background: undefined,
  cornerTop: false,
  cornerBottom: false,
  content: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  links: undefined
})

const highlight = computed(
  () => props.theme === 'reverse' || props.theme === 'neutral'
)

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
  <RplHeader :theme="theme" class="rpl-header--hero">
    <template v-if="background || cornerTop || cornerBottom" #backdrop>
      <RplImage
        v-if="background"
        :src="background.src"
        :sizes="background.sizes"
        :src-set="background.srcSet"
        :focal-point="background.focalPoint"
        priority="high"
      />
      <RplHeaderGraphic v-if="cornerTop" placement="top" />
      <RplHeaderGraphic v-if="cornerBottom" placement="bottom" />
    </template>
    <template v-if="logo && !background" #upper>
      <RplImage class="rpl-header__logo" :src="logo" alt="" />
    </template>
    <template #title>
      <h1 :class="titleClasses">{{ title }}</h1>
    </template>
    <p v-if="content" :class="contentClasses" v-html="content"></p>
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
