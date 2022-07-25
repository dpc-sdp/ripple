<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplSocialSharePage } from './constants'
import RplIcon from '../icon/icon.vue'

defineProps({
  title: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: 'Share this'
  },
  networks: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => ['facebook', 'twitter', 'linkedin']
  },
  page: {
    type: Object as PropType<typeof RplSocialSharePage>,
    required: true,
    default: () => {
      return {
        title: '',
        url: ''
      }
    }
  }
})
</script>

<template>
  <div v-if="page.title && page.url" class="rpl-social-share">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items rpl-u-focusable-container">
      <ShareNetwork
        v-for="network in networks"
        :key="network"
        :network="network"
        :title="page.title"
        :url="page.url"
      >
        <RplIcon
          class="rpl-social-share__icon"
          :name="`icon-${network}`"
        ></RplIcon>
        <span class="rpl-type-label-small">{{
          network.charAt(0).toUpperCase() + network.substring(1)
        }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>

<style src="./social-share.css" />
