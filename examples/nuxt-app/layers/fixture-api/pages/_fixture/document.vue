<template>
  <TideBaseLayout
    :site="site"
    :page="page"
    :siteSection="page.siteSection"
    :background="page.background"
    :pageTitle="page.title"
    :pageLanguage="page.lang"
    :updatedDate="page.created"
    :showContentRating="page.showContentRating"
  >
    <template #aboveBody="{ hasBreadcrumbs }">
      <TideHeroHeader :header="page.header" :hasBreadcrumbs="hasBreadcrumbs" />
    </template>
    <template #body>
      <RplContent :html="fixture.processed" />
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import site from '../../test/fixtures/site/vic.json'
import fixture from '../../../../../../packages/ripple-tide-api/src/utils/markup-transpiler/complex.fixture'
const page = {
  siteSection: '',
  background: '',
  lang: 'en',
  created: '2021-10-01T00:00:00Z',
  showContentRating: false,
  title: 'Document test',
  header: {
    title: 'Document test'
  }
}
</script>
