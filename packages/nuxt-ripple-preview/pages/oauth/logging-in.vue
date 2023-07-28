<script setup lang="ts">
import { useTideSite, useRoute } from '#imports'
import { AuthRoutes, LOGIN_DESTINATION_KEY } from '../../utilities/constants'
import { onMounted } from 'vue'

const site = await useTideSite()

const route = useRoute()

onMounted(() => {
  // Users will be redirected to this page after visiting a preview URL without an access token

  // Store the original destination in local storage so we can redirect to it after login
  localStorage.setItem(LOGIN_DESTINATION_KEY, route.query.destination)

  // Start the OAuth flow, the user will get redirected to the Tide login page (which will
  // eventually redirect back to the callback URL)
  window.location.href = AuthRoutes.LOGIN
})
</script>

<template>
  <TideBaseLayout
    :site="site"
    :page="{}"
    :pageTitle="`Logging in - ${site.name}`"
    pageLanguage="en-AU"
  >
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        title="Logging in..."
        :behind-nav="true"
        :breadcrumbs="hasBreadcrumbs"
        :cornerTop="site?.cornerGraphic?.top?.src || true"
        :cornerBottom="site?.cornerGraphic?.bottom?.src || true"
      />
    </template>
    <template #body>You will be redirected shortly</template>
    <template #sidebar>
      <span />
    </template>
  </TideBaseLayout>
</template>
