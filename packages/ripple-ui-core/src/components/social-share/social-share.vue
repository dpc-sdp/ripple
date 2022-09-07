<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import { RplSocialSharePage } from './constants'
import RplIcon from '../icon/icon.vue'

interface Props {
  title?: string | null,
  networks?: string[],
  page?: RplSocialSharePage,
}

withDefaults(defineProps<Props>(), {
  title: 'Share this',
  networks: () => ['facebook', 'twitter', 'linkedin'],
  page: () => {
    return {
      title: '',
      url: ''
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
        class="
          rpl-text-link
          rpl-social-share__link
          rpl-u-focusable rpl-u-focusable--inline
          rpl-type-p-small
        "
      >
        <RplIcon
          class="rpl-social-share__icon"
          :name="`icon-${network.toLowerCase()}`"
        ></RplIcon>
        <span>{{ network }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>

<style src="./social-share.css" />
