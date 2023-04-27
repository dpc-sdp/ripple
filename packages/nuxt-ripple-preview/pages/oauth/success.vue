<script setup lang="ts">
import { useTideSite } from '#imports'
import { onMounted } from 'vue'

const site = await useTideSite()

onMounted(() => {
  // Users will be redirected to this page after successful login

  // Get the original destination from localStorage and redirect to it
  window.location.href = localStorage.getItem('login-destination')
})
</script>

<template>
  <TideBaseLayout
    :site="site"
    :page="{}"
    :pageTitle="`Logged in - ${site.name}`"
    pageLanguage="en-AU"
  >
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        title="Logged in..."
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
      />
    </template>
    <template #body> Please wait </template>
    <template #sidebar>
      <span />
    </template>
  </TideBaseLayout>
</template>
