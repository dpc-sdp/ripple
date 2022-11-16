<template>
  <TideBaseLayout
    :site="site"
    pageTitle="Test page"
    pageDescription="Cool test page"
  >
    <template #body>
      <h2>All about stuff</h2>
      <RplAlert alertId="test" message="Some random stuff" />
    </template>

    <template #sidebar>
      <p>Sidebar things</p>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
// TODO Just remove this demo page
import { useRuntimeConfig, useFetch } from '#imports'

const { public: config } = useRuntimeConfig()
const siteId = config.tide?.contentApi.site

const { data: site, error: siteError } = await useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})
</script>
