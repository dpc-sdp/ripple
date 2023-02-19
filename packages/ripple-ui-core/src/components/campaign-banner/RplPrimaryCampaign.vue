<script setup lang="ts">
import RplCampaignBanner from './RplCampaignBanner.vue'
import RplImage from '../image/RplImage.vue'
import RplButton from '../button/RplButton.vue'
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
      <RplImage
        v-bind="image"
        :aspect="{ xs: 'wide', s: 'panorama' }"
        alt=""
        data-cy="image"
      />
    </template>
    <template #title>
      <h2 class="rpl-campaign-banner__title rpl-type-h2" data-cy="title">
        {{ title }}
      </h2>
    </template>
    <slot></slot>
    <div v-if="link" class="rpl-campaign-banner__action">
      <RplButton el="a" :url="link.url" data-cy="cta">{{
        link.text
      }}</RplButton>
    </div>
    <template v-if="$slots.meta" #meta>
      <slot name="meta"></slot>
    </template>
  </RplCampaignBanner>
</template>
