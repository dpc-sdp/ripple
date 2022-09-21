<template>
  <div class="rpl-tide-page">
    <rpl-icon-sprite />
    <header v-if="site" class="rpl-tide-page__header">
      <slot name="header"> NAV PRIMARY GOES HERE </slot>
    </header>
    <main v-if="page" class="rpl-tide-page__body rpl-container">
      <slot name="body">
        <h1>{{ site.name }}</h1>
        <component :is="componentName" :page="page" />
      </slot>
    </main>
    <div v-else>Error</div>
    <footer v-if="site" class="rpl-tide-page__footer">
      <slot name="footer">
        {{ site.menuFooter }}
      </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import {
  useRoute,
  useRuntimeConfig,
  useFetch,
  useHead,
  useSiteTheme
} from '#imports'
import { computed } from 'vue'
import { pascalCase } from 'change-case'

const route = useRoute()
const config = useRuntimeConfig()
// @ts-ignore
const [{ data: site }, { data: page }] = await Promise.all([
  useFetch('/api/tide/site', {
    baseURL: config.API_URL || '',
    params: {
      id: config.SITEID
    }
  }),
  useFetch('/api/tide/page', {
    baseURL: config.API_URL || '',
    params: {
      path: route.path,
      site: config.SITEID
    }
  })
])

const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}Page`
)

const style = useSiteTheme(site.value?.theme)
useHead({
  title: page.value?.title,
  htmlAttrs: {
    lang: page.value?.lang || 'en-AU'
  },
  style: style && [
    {
      children: `body { ${style} }`
    }
  ],
  meta: [
    {
      name: 'description',
      content: page.value?.description
    }
  ]
})
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
