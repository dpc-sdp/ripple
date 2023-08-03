<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { RplSocialShareNetworks } from './constants'
import RplSocialShareLink from './RplSocialShareLink.vue'

interface Props {
  title?: string
  networks?: string[]
  pagetitle: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => Object.keys(RplSocialShareNetworks)
})

// Check that network has a template in constants
const validNetworks = computed(() =>
  props.networks.filter((k) => Object.keys(RplSocialShareNetworks).includes(k))
)

const state = reactive({
  url: ''
})

onMounted(() => {
  state.url = location.href
})
</script>

<template>
  <div v-if="pagetitle && state.url" class="rpl-social-share rpl-u-screen-only">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items">
      <RplSocialShareLink
        v-for="network in validNetworks"
        :key="network.toLowerCase()"
        :network="network"
        :title="pagetitle"
        :label="title"
        :url="state.url"
      ></RplSocialShareLink>
    </div>
  </div>
</template>

<style src="./RplSocialShare.css" />
