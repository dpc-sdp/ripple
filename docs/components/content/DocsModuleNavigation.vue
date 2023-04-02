<script setup lang="ts">
import { NavItem } from '@nuxt/content/dist/runtime/types'
import { IRplVerticalNavItem } from '~~/../packages/ripple-ui-core/src/components/vertical-nav/constants'

const route = useRoute()

const navigation = await useDocsNavigation([
  route.params.slug[0],
  route.params.slug[1],
  route.params.slug[2]
])
</script>

<template>
  <div>
    <DocsNavLink :url="navigation[0].url">
      {{ navigation[0].text }}
    </DocsNavLink>
    <RplVerticalNavChildList :items="navigation[0].items" :level="2" />
  </div>
</template>

<style scoped>
.rpl-vertical-nav {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}
</style>
