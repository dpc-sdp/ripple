<script lang="ts">
export default { name: 'MockedPage' }
</script>
<template>
  <slot v-if="page" :name="`${componentName}Page`" v-bind="{ page, site }">
    <TideGrantPage :page="page">
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
        <RplSocialShare :page="socialLink"></RplSocialShare>
      </template>
      <template #footer>
        <slot name="footer">
          <RplFooter></RplFooter>
        </slot>
      </template>
    </TideGrantPage>
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
import TideGrantPage from './index.vue'

interface Props {
  page: any
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
