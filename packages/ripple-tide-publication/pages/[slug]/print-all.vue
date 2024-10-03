<script lang="ts">
export default {
  name: 'TidePublicationPrintAllPage'
}
</script>

<script setup lang="ts">
import {
  useTideSite,
  useTidePage,
  useTidePublicationMenu,
  useTidePublicationChildren,
  useRoute
} from '#imports'
import { onMounted } from 'vue'

const flatten = (items) => {
  return (items || []).reduce((acc, item) => {
    return [...acc, item.id, ...flatten(item.items)]
  }, [])
}

const route = useRoute()

const parentSlug = route.params.slug
const site = await useTideSite()

const parentPage = await useTidePage(`/${parentSlug}`)
const menu = await useTidePublicationMenu(parentPage.nid)
const flattenedChildIds = flatten(menu.publication.items)
const childPages = await useTidePublicationChildren(
  parentPage.nid,
  flattenedChildIds
)

onMounted(() => {
  window.print()
})

useHead({
  meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<template>
  <TideBaseLayout
    :site="site"
    :page="{}"
    :pageTitle="`Print - ${parentPage.title}`"
    pageLanguage="en-AU"
  >
    <template #breadcrumbs>
      <slot name="breadcrumbs">
        <TideBreadcrumbs
          :items="[
            { text: 'Home', url: '/' },
            { text: parentPage.title, url: parentPage.url },
            { text: 'Print' }
          ]"
          :besideQuickExit="site?.showQuickExit"
        />
      </slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <TideHeroHeader
        v-if="parentPage.header"
        :header="parentPage.header"
        :hasBreadcrumbs="hasBreadcrumbs"
        :cornerTop="site?.cornerGraphic?.top"
        :cornerBottom="site?.cornerGraphic?.bottom"
      />
    </template>
    <template #body>
      <RplInPageNavigation
        v-if="childPages.length"
        title="On this page"
        :items="menu.publication.items"
      />
      <TidePublicationBody
        :details="parentPage.details"
        :components="parentPage.bodyComponents"
      />
      <div v-for="child in childPages" :key="child.id">
        <TidePublicationChapterPrintHeader
          :title="child.header.title"
          :summary="child.header.summary"
        />
        <TidePublicationBody :components="child.bodyComponents" />
      </div>
    </template>
    <template #sidebar>
      <span />
    </template>
  </TideBaseLayout>
</template>
