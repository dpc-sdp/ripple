<script lang="ts">
export default { name: 'RplSocialShareLink' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { RplSocialShareNetworks } from './constants'
import { usePopupWindow } from '../../composables/usePopupWindow'

interface Props {
  network: string
  title: string
  url: string
}

const props = defineProps<Props>()

const key = computed(() => props.network.toLowerCase())

const shareTemplate = () =>
  RplSocialShareNetworks[props.network]
    .replace('$t', encodeURIComponent(props.title))
    .replace('$u', encodeURIComponent(props.url))

const share = usePopupWindow(shareTemplate(), key.value)
</script>

<template>
  <div
    class="
      rpl-social-share-link
      rpl-text-link
      rpl-u-focusable-inline
      rpl-type-p-small
    "
    tabindex="0"
    :aria-label="`Share this page on ${network}`"
    @click.prevent="share"
    @keydown.enter="share"
  >
    <RplIcon class="rpl-social-share__icon" :name="`icon-${key}`"></RplIcon>
    <span>{{ network }}</span>
  </div>
</template>

<style src="./social-share.css" />
