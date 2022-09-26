<script lang="ts">
export default { name: 'RplHeroHeader' }
</script>

<script setup lang="ts">
import RplHeader from './header.vue'
import { Links } from './constants'
import RplIcon from '../icon/icon.vue'
import RplHeaderLinks from './header-links.vue'

interface Props {
  title: string
  content?: string
  links?: Links
}

withDefaults(defineProps<Props>(), {
  content: undefined,
  links: undefined
})
</script>

<template>
  <RplHeader class="rpl-header--intro">
    <template #upper>
      <RplIcon name="icon-exclamation-circle-filled" size="l" />
    </template>
    <template #title>
      <h1 class="rpl-type-h2">{{ title }}</h1>
    </template>
    <div v-if="content" v-html="content" class="rpl-type-p-large"></div>
    <template v-if="links" #aside>
      <RplHeaderLinks :title="links?.title" :items="links.items" :more-link="links.more" />
    </template>
  </RplHeader>
</template>
