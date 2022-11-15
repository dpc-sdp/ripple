<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import ShareNetwork from 'vue-social-sharing/src/share-network'
import { Props as ShareNetworkProps } from 'vue-social-sharing/types'

interface Props {
  title?: string | null
  networks?: string[]
  pagetitle?: string
  pageurl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => ['Facebook', 'Twitter', 'LinkedIn'],
  pagetitle: '',
  pageurl: ''
})

const shareLink = (i: number) => {
  let l: ShareNetworkProps = {
    network: props.networks[i].toLowerCase(),
    url: props.pageurl,
    title: props.pagetitle
  }
  return l
}
</script>

<template>
  <div v-if="pagetitle && pageurl" class="rpl-social-share">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items">
      <div
        v-for="(network, index) of networks"
        :key="index"
        class="
          rpl-text-link
          rpl-social-share__link
          rpl-u-focusable-inline rpl-type-p-small
        "
      >
        <ShareNetwork v-bind="shareLink(index)">
          <RplIcon
            class="rpl-social-share__icon"
            :name="`icon-${network.toLowerCase()}`"
          ></RplIcon>
          <span>{{ network }}</span>
        </ShareNetwork>
      </div>
    </div>
  </div>
</template>

<style src="./social-share.css" />
