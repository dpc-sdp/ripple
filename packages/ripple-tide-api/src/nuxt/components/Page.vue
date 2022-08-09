<template>
  <div class="rpl-tide-page">
    <rpl-icon-sprite />
    <header v-if="site" class="rpl-tide-page__header">
      <slot name="header">
        <rpl-nav-primary>
          <template #open>Open Menu</template>
        </rpl-nav-primary>
      </slot>
    </header>
    <main v-if="page" class="rpl-tide-page__body rpl-container">
      <slot name="body">
        <component :is="componentName" :page="page" />
      </slot>
    </main>
    <div v-else>Error</div>
    <footer v-if="site" class="rpl-tide-page__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRoute, useRuntimeConfig, useFetch } from '#imports'
import { computed } from 'vue'
import { pascalCase } from 'change-case'

const route = useRoute()
const config = useRuntimeConfig()
const [{ data: site }, { data: page }] = await Promise.all([
  useFetch('/api/tide/site', {
    params: {
      id: config.SITEID
    }
  }),
  useFetch('/api/tide/page', {
    params: {
      path: route.path,
      site: config.SITEID
    }
  })
])
const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}Page`
)
</script>

<style>
.rpl-tide-page {
  &__header {
    padding: var(--rpl-sp-5);
  }
  &__body {
    padding: var(--rpl-sp-5);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
