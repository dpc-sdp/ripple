<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import RplHeader from './header.vue'
import { Links } from './constants'
import RplIcon from '../icon/icon.vue'
import RplHeaderLinks from './header-links.vue'
import { RplIconNames } from '../icon/constants'

interface Props {
  title: string
  content?: string
  links?: Links
  iconName?: typeof RplIconNames[number]
}

withDefaults(defineProps<Props>(), {
  content: undefined,
  links: undefined,
  iconName: 'icon-exclamation-circle-filled',
})
</script>

<template>
  <RplHeader class="rpl-header--intro">
    <template #upper>
      <RplIcon :name="iconName" size="l" />
    </template>
    <template #title>
      <h1 class="rpl-type-h2">{{ title }}</h1>
    </template>
    <div v-if="content" class="rpl-type-p" v-html="content"></div>
    <template v-if="links" #aside>
      <RplHeaderLinks :title="links?.title" :items="links.items" :more-link="links.more" />
    </template>
  </RplHeader>
</template>
