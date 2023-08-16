<template>
  <RplSocialShare
    data-sidebar-component-id="tide-sidebar-social-share"
    :pagetitle="pageTitle"
    :url="url"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface Props {
  pageTitle: string
}

defineProps<Props>()

const { $app_origin } = useNuxtApp()

const url = computed(() => `${$app_origin}${useRoute().path}`)
</script>
