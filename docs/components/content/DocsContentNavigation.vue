<script setup lang="ts">
import { NavItem } from '@nuxt/content/dist/runtime/types'
import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

const route = useRoute()
const { sections } = useAppConfig()

// The site is split into sections with separate sidebar navigations
// E.g. If we on the page `/cats/are/cute`, then we just want the content for 'cats' (i.e. `queryContent('cats')`)
const sectionSlug = route.params.slug[0]

const navigation = await useDocsNavigation([sectionSlug || 'design-system'], {
  layout: { $ne: 'module' }
})
</script>

<template>
  <div>
    <RplVerticalNav :items="navigation" />
    <DocsNavLink
      :url="
        sectionSlug === 'framework'
          ? '/design-system/about/what-is-ripple'
          : '/framework'
      "
      icon="icon-link-external-square-filled"
      iconPosition="end"
      class="docs-section-link"
    >
      {{
        sectionSlug === 'framework'
          ? sections['design-system'].title
          : sections['framework'].title
      }}
    </DocsNavLink>
  </div>
</template>

<style scoped>
.rpl-vertical-nav {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.docs-section-link {
  margin-top: var(--rpl-sp-3);
}
</style>
