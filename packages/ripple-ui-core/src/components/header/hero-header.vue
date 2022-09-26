<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplHeader from './header.vue'
import RplImage from '../image/image.vue'
import RplList from '../list/list.vue'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import RplButton from '../button/button.vue'
import { CoreLink, Links, RplHeaderThemes } from './constants'

interface Props {
  title: string
  theme?: RplHeaderThemes
  logo?: string
  background?: object // TODO
  content?: string
  primaryAction: CoreLink // TODO
  secondaryAction: CoreLink
  links?: Links[]
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  logo: undefined,
  background: undefined,
  content: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  links: undefined
})

const titleClasses = computed(() => ({
  'rpl-header__title': true,
  'rpl-type-h1': props.theme === 'default',
  'rpl-type-h1-highlight': props.theme === 'reverse'
}))

const contentClasses = computed(() => ({
  'rpl-type-p-large': true,
  'rpl-type-p-highlight': props.theme === 'reverse'
}))
</script>

<template>
  <RplHeader type="hero">
    <template v-if="background" #backdrop>
      <RplImage
        :src="background.src"
        :sizes="background.sizes"
        :src-set="background.srcSet"
        :focal-point="background.focalPoint"
        priority="high"
      />
    </template>
    <template v-if="logo" #upper>
      <RplImage class="rpl-header__logo" :src="logo" alt="" />
    </template>
    <template #title>
      <h1 :class="titleClasses">{{ title }}</h1>
    </template>
    <p v-if="content" v-html="content" :class="contentClasses"></p>
    <template v-if="primaryAction || secondaryAction" #lower>
      <RplButton v-if="primaryAction" :url="primaryAction.url" el="a">
        {{ primaryAction.text }}
      </RplButton>
      <RplTextLink
        v-if="secondaryAction"
        :url="secondaryAction.url"
        class="rpl-header__action-link"
      >
        {{ secondaryAction.text }} <RplIcon name="icon-arrow-right" size="s" />
      </RplTextLink>
    </template>
    <template v-if="links" #aside>
      <h2 v-if="links.heading" class="rpl-type-h4">{{ links.heading }}</h2>
      <RplList
        :items="links.items"
        container-class="rpl-header-links__list"
        item-class="rpl-header-links__item rpl-type-p"
      />
      <RplTextLink v-if="links?.more" :url="links.more.url">
        {{ links.more.text }} <RplIcon name="icon-arrow-right" size="s" />
      </RplTextLink>
    </template>
  </RplHeader>
</template>
