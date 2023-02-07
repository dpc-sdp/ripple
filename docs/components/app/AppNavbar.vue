<script lang="ts" setup>
const route = useRoute()
const { title, sections } = useAppConfig()

const sectionSlug = route.params.slug[0]
const sectionConfig = sections[sectionSlug as keyof typeof sections]

const sectionTitle = sectionConfig?.title || title
const sectionColor = sectionConfig?.color || undefined
</script>

<template>
  <header class="docs-header" :style="{ '--docs-header-color': sectionColor }">
    <div class="rpl-container">
      <div class="docs-header-inner">
        <!-- Logo -->
        <a
          aria-current="page"
          href="/"
          class="docs-header-logo rpl-u-focusable-outline"
          aria-label="false"
          ><img class="w-8" src="/img/vicgovau-logo.svg" width="100" />
        </a>

        <span class="flex text-sm font-bold mx-2 dark:text-white">
          {{ sectionTitle }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.docs-header {
  --docs-header-color: var(--rpl-clr-primary);
  background: var(--docs-header-color);
  color: var(--rpl-clr-light);
}

.docs-header-inner {
  display: flex;
  align-items: center;
  height: 60px;
}

.docs-header-logo img {
  display: block;
  height: 16px;
  width: 106px;
}
</style>
