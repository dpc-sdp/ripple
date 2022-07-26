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
    <div class="rpl-social-share__items">
      <ShareNetwork
        v-for="network in networks"
        :key="network.toLowerCase()"
        :network="network.toLowerCase()"
        :title="page.title"
        :url="page.url"
        class="rpl-social-share__link rpl-u-focusable rpl-u-focusable--inline"
      >
        <RplIcon
          class="rpl-social-share__icon"
          :name="`icon-${network.toLowerCase()}`"
        ></RplIcon>
        <span class="rpl-type-label-small">{{ network }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>

<style src="./social-share.css" />
