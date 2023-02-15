<script lang="ts">
export default {
  name: 'TideWrapper'
}
</script>

<script setup lang="ts">
import { RplHeaderHeroHeader as RplHeroHeader } from '#components'
import { useRuntimeConfig, useFetch, createError } from '#imports'

const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

const { data: site, error: siteError } = await useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

if (siteError.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'We have a glitch in our system.',
    message: `<p>We are aware of the issue. We appreciate your patience while we’re looking into it.</p>`
  })
}
</script>

<template>
  <TideBaseLayout :site="site">
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        title="Sitemap"
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
      />
    </template>
    <template #body>
      <RplSitemap :items="site.menus.menuMain" />
    </template>
    <template #sidebar>
      <span />
    </template>
  </TideBaseLayout>
</template>
