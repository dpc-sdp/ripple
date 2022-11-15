<script lang="ts">
export default { name: 'RplSocialShareLink' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { usePopupWindow } from '../../composables/usePopupWindow'

interface Props {
  network: string
  title: string
  url: string
}

const props = defineProps<Props>()

const key = computed(() => props.network.toLowerCase())

const shareTemplate = () => {
  let out = ''
  switch (props.network.toLowerCase()) {
    case 'facebook':
      out = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        props.url
      )}&title=${encodeURIComponent(props.title)}`
      break
    case 'linkedin':
      out = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        props.url
      )}`
      break
    case 'twitter':
      out = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        props.title
      )}&url=${encodeURIComponent(props.url)}`
      break
  }
  return out
}

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
