<template>
  <RplSocialShare
    v-if="networks && networks.length"
    data-sidebar-component-id="tide-sidebar-social-share"
    title="Share this page"
    :networks="networks"
    :page="page"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  networks?: string[]
  pageTitle: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => []
})

const page = ref({
  url: '',
  title: ''
})

onMounted(() => {
  page.value = {
    url: location.href,
    title: props.pageTitle
  }
})
</script>
