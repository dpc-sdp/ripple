<script lang="ts">
export default { name: 'RplSocialShareLink' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import RplTextLink from '../text-link/text-link.vue'
import { RplSocialShareNetworks } from './constants'
import { usePopupWindow } from '../../composables/usePopupWindow'

interface Props {
  network: string
  title: string
  url: string
}

const props = defineProps<Props>()

const key = computed(() => props.network.toLowerCase())

const shareTemplate = computed(() =>
  RplSocialShareNetworks[props.network]
    .replace('$t', encodeURIComponent(props.title))
    .replace('$u', encodeURIComponent(props.url))
)

const share = usePopupWindow(shareTemplate.value, key.value)
</script>

<template>
  <RplTextLink
    :url="shareTemplate"
    :aria-label="`Share this page on ${network}`"
    class="rpl-social-share-link rpl-type-p-small"
    @click.prevent="share"
  >
    <RplIcon class="rpl-social-share__icon" :name="`icon-${key}`"></RplIcon>
    <span>{{ network }}</span>
  </RplTextLink>
</template>

<style src="./social-share.css" />
