<script lang="ts">
export default { name: 'MockPage' }
</script>
<template>
  <slot v-if="page" :name="`${componentName}Page`" v-bind="{ page, site }">
    <component :is="pageComponent" :page="page">
      <template #aboveHeader>
        <RplIconSprite />
        <slot name="aboveHeader">
          <RplAlert
            v-for="alert in site.alerts"
            v-bind="alert"
            :key="alert.alertId"
          />
        </slot>
      </template>
      <template #primaryNav>
        <slot name="primaryNav">
          <RplNavPrimary></RplNavPrimary>
        </slot>
      </template>
      <template #breadcrumbs>
        <slot name="breadcrumbs">
          <RplBreadcrumbs
            v-if="breadcrumbs"
            v-bind="breadcrumbs"
          ></RplBreadcrumbs>
        </slot>
      </template>
      <template #sidebar>
        <RplSocialShare v-if="url" :page="socialLink"></RplSocialShare>
      </template>
      <template #footer>
        <slot name="footer">
          <RplFooter></RplFooter>
        </slot>
      </template>
    </component>
  </slot>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  RplIconSprite,
  RplAlert,
  RplNavPrimary,
  RplBreadcrumbs,
  RplSocialShare,
  RplFooter
} from '@dpc-sdp/ripple-ui-core'

interface Props {
  page: any
  pageComponent: any
  url: string
  site: any
  breadcrumbs: any
  componentName: string
}

const props = defineProps<Props>()
const socialLink = computed(() => {
  return {
    title: props.page.title,
    url: props.url
  }
})
</script>
