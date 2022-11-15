<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import ShareNetwork from 'vue-social-sharing/src/share-network'

interface Props {
  title?: string
  networks?: string[]
  pagetitle?: string
  pageurl?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => ['Facebook', 'Twitter', 'LinkedIn'],
  pagetitle: '',
  pageurl: ''
})
</script>

<template>
  <div v-if="pagetitle && pageurl" class="rpl-social-share">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items">
      <ShareNetwork
        v-for="network in networks"
        :key="network.toLowerCase()"
        :network="network.toLowerCase()"
        :title="pagetitle"
        :url="pageurl"
        class="
          rpl-text-link
          rpl-social-share__link
          rpl-u-focusable-inline rpl-type-p-small
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
