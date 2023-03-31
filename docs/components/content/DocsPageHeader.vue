<script lang="ts" setup>
interface Props {
  title: string
  description?: string
  links?: {
    text: string
    url: string
  }[]
}

withDefaults(defineProps<Props>(), {
  description: '',
  links: () => []
})
</script>

<template>
  <header class="docs-page-header">
    <h1 class="rpl-type-h1 rpl-u-margin-b-2">
      {{ title }}
    </h1>
    <p class="rpl-type-p-large">{{ description }}</p>
    <ul class="links rpl-u-margin-t-5" v-if="links && links.length">
      <li v-for="(link, index) in links" :key="index">
        <DocsLink
          isExternal
          iconPosition="start"
          :url="link.url"
          class="rpl-type-p"
          >{{ link.text }}</DocsLink
        >
      </li>
    </ul>
  </header>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-page-header {
  margin-bottom: var(--rpl-sp-7);

  @media (--rpl-bp-m) {
    margin-bottom: var(--rpl-sp-9);
  }
}

.links {
  display: flex;
  gap: var(--rpl-sp-5);
}
</style>
