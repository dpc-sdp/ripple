<template>
  <RplSocialShare
    data-sidebar-component-id="tide-sidebar-social-share"
    :pagetitle="pageTitle"
    :url="url"
    :networks="activeNetworks"
    :email="email"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type {
  IRplFeatureFlags,
  TideSocialShare
} from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  pageTitle: string
  networks: string[]
}

const props = defineProps<Props>()

const route = useRoute()
const { $app_origin } = useNuxtApp()

const url = computed(() => `${$app_origin}${route?.path}`)

const { socialShare: flags }: IRplFeatureFlags = inject('featureFlags', {})

const activeNetworks = computed(() => {
  const items =
    props.networks?.filter(
      (item: any) => flags?.[item as keyof TideSocialShare] ?? true
    ) || []
  if (flags?.WhatsApp) {
    items.push('WhatsApp')
  }
  return items.length > 0 ? items : undefined
})

const parseText = (text: string): string => {
  return text
    .replace('[title]', encodeURIComponent(props.pageTitle))
    .replace('[url]', encodeURIComponent(url.value))
    .replace('[enter]', ' %0D%0A %0D%0A ')
}

const email = computed(() => {
  if (!flags?.email || !flags?.emailSubject || !flags?.emailBody) return null

  return {
    subject: parseText(flags.emailSubject),
    body: parseText(flags.emailBody)
  }
})
</script>
