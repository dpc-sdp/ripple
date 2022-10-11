<script lang="ts">
export default { name: 'RplPrimaryCampaign' }
</script>

<script setup lang="ts">
import RplCampaignBanner from './campaign-banner.vue'
import RplImage from '../image/image.vue'
import RplButton from '../button/button.vue'
import { RplLink } from '../../lib/constants'
import { RplImageType } from '../image/constants'

interface Props {
  title: string
  image?: RplImageType
  link?: RplLink
}

withDefaults(defineProps<Props>(), {
  image: undefined,
  link: undefined
})
</script>

<template>
  <RplCampaignBanner class="rpl-campaign-banner--primary">
    <template v-if="image" #media>
      <RplImage v-bind="image" :aspect="{ xs: 'wide', s: 'panorama' }" alt="" />
    </template>
    <template #title>
      <h2 class="rpl-campaign-banner__title rpl-type-h2">{{ title }}</h2>
    </template>
    <slot></slot>
    <div v-if="link" class="rpl-campaign-banner__action">
      <RplButton el="a" :url="link.url">{{ link.text }}</RplButton>
    </div>
    <template v-if="$slots.meta" #meta>
      <slot name="meta"></slot>
    </template>
  </RplCampaignBanner>
</template>
