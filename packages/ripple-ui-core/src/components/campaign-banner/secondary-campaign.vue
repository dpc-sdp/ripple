<script lang="ts">
export default { name: 'RplSecondaryCampaign' }
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
  <RplCampaignBanner class="rpl-campaign-banner--secondary">
    <template v-if="image" #media>
      <RplImage
        v-bind="image"
        :aspect="{ xs: 'wide', s: 'ultrawide', l: 'wide' }"
      />
    </template>
    <template #title>
      <h1 class="rpl-campaign-banner__title rpl-type-h2">{{ title }}</h1>
    </template>
    <slot></slot>
    <div class="rpl-campaign-banner__action">
      <RplButton v-if="link" el="a" :url="link.url">{{ link.text }}</RplButton>
    </div>
  </RplCampaignBanner>
</template>
