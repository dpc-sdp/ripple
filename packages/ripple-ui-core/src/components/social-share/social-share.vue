<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import RplSocialShareLink from './social-share-link.vue'

interface Props {
  title?: string
  networks?: string[]
  pagetitle: string
}

withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => ['Facebook', 'Twitter', 'LinkedIn']
})

const state = reactive({
  url: ''
})

onMounted(() => {
  state.url = location.href
})
</script>

<template>
  <div v-if="pagetitle && state.url" class="rpl-social-share">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items">
      <RplSocialShareLink
        v-for="network in networks"
        :key="network.toLowerCase()"
        :network="network"
        :title="pagetitle"
        :url="state.url"
      ></RplSocialShareLink>
    </div>
  </div>
</template>

<style src="./social-share.css" />
