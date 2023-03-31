<script setup lang="ts">
interface Props {
  module: {
    name: string
    packageName: string
    sourceUrl: string
    issuesUrl: string
    contributor: {
      name: string
      url: string
    }
  }
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="docs-module">
    <div class="docs-module-section">
      <h2 class="docs-module-name rpl-type-p-large">{{ module.name }}</h2>
      <p class="rpl-type-p">{{ module.packageName }}</p>

      <div class="docs-module-links">
        <DocsLink :url="module.sourceUrl" isExternal>View source</DocsLink>
        <DocsLink :url="module.issuesUrl" isExternal>Report an issue</DocsLink>
      </div>
    </div>
    <div class="docs-module-section">
      <p class="rpl-type-p-small">
        Contributed by
        <RplTextLink :url="module.contributor.url">{{
          module.contributor.name
        }}</RplTextLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.docs-module {
  margin-top: var(--rpl-sp-9);
}
.docs-module-name {
  background: var(--rpl-clr-accent-alt);
  color: var(--rpl-clr-type-primary-alt-accessible);
  display: inline-block;
  padding: 0 var(--rpl-sp-2);
  margin-bottom: var(--rpl-sp-2);
}

.docs-module-section {
  padding-bottom: var(--rpl-sp-5);
  margin-bottom: var(--rpl-sp-5);
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}

.docs-module-links {
  margin-top: var(--rpl-sp-5);
  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-3);
}
</style>
