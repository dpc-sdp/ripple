<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplHeader from './header.vue'
import RplImage from '../image/image.vue'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import RplButton from '../button/button.vue'
import { ContextLink, CoreLink, Links, RplHeaderThemes } from './constants'
import RplHeaderLinks from './header-links.vue'

interface Props {
  title: string
  theme?: RplHeaderThemes
  logo?: string
  background?: object // TODO
  content?: string
  primaryAction: CoreLink // TODO
  secondaryAction: ContextLink
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
    <template v-if="logo && !background" #upper>
      <RplImage class="rpl-header__logo" :src="logo" alt="" />
    </template>
    <template #title>
      <h1 :class="titleClasses">{{ title }}</h1>
    </template>
    <p v-if="content" :class="contentClasses" v-html="content"></p>
    <template v-if="(primaryAction || secondaryAction) && !background" #lower>
      <RplButton
        v-if="primaryAction"
        :url="primaryAction.url"
        class="rpl-header__action-button"
        el="a"
      >
        {{ primaryAction.text }}
      </RplButton>
      <div class="rpl-header__action-secondary">
        <p v-if="secondaryAction.title" class="rpl-type-p">{{ secondaryAction.title }}</p>
        <RplTextLink
          v-if="secondaryAction"
          :url="secondaryAction.url"
          class="rpl-header__icon-link rpl-header-links__more rpl-type-label rpl-type-weight-bold"
        >
          {{ secondaryAction.text }} <RplIcon name="icon-arrow-right" size="s" />
        </RplTextLink>
      </div>
    </template>
    <template v-if="links && !background" #aside>
      <RplHeaderLinks :title="links?.title" :items="links.items" :more-link="links.more" />
    </template>
  </RplHeader>
</template>
