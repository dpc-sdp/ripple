<script setup lang="ts">
const route = useRoute()
const { sections, hideModulesSection } = useAppConfig()

// The site is split into sections with separate sidebar navigations
// E.g., If we on the page `/design-system/components/accordion`, then we just want the content for 'design-system'
const sectionSlug = route.params.slug[0]

const navigation = await useDocsNavigation([sectionSlug || 'design-system'])

const processedNav = navigation?.map((item) => {
  return {
    ...item,
    url: item.items?.length ? null : item.url
  }
})
</script>

<template>
  <div>
    <RplVerticalNav :items="processedNav" />
    <DocsNavLink
      v-if="!hideModulesSection"
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
  padding: 0;
}

.docs-section-link {
  color: inherit;
  margin-top: var(--rpl-sp-3);
}
</style>
