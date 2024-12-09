<script lang="ts">
export default {
  name: 'TideWrapper'
}
</script>

<script setup lang="ts">
import { useTideSite } from '#imports'

const site = await useTideSite()
const page = { title: 'Sitemap' }

const toc = computed(() => {
  return site.menus.menuMain.map((item) => {
    return {
      text: item.text,
      url: `#${item.id}`
    }
  })
})
</script>

<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :pageTitle="page.title"
    pageLanguage="en-AU"
  >
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        title="Sitemap"
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
        :cornerTop="site?.cornerGraphic?.top?.src || true"
        :cornerBottom="site?.cornerGraphic?.bottom?.src || true"
      />
    </template>
    <template #body>
      <RplPageComponent v-if="site.sitemap?.showTableOfContents">
        <RplInPageNavigation
          :title="site.sitemap?.tableOfContentsTitle || 'Jump to'"
          :items="toc"
        />
      </RplPageComponent>
      <RplPageComponent>
        <RplSitemap :items="site.menus.menuMain" />
      </RplPageComponent>
    </template>
    <template #sidebar>
      <span />
    </template>
  </TideBaseLayout>
</template>
