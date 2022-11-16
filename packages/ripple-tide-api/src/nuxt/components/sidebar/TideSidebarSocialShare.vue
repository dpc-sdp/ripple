<template>
  <RplSocialShare
    data-sidebar-component-id="tide-sidebar-social-share"
    :pagetitle="pageTitle"
  />
</template>

<script setup lang="ts">
interface Props {
  pageTitle: string
}

defineProps<Props>()
</script>
