<script lang="ts">
export default {
  name: 'TideWrapper'
}
</script>

<script setup lang="ts">
import { useTideSite } from '#imports'

const site = await useTideSite()

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
    :page="{}"
    :pageTitle="`Sitemap - ${site.name}`"
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
          :title="site.sitemap?.tableOfContentsTitle || 'asd to'"
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
