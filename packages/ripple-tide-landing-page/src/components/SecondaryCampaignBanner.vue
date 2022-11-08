<script setup lang="ts">
import { RplSecondaryCampaign } from '@dpc-sdp/ripple-ui-core'
import { ITideSecondaryCampaign } from '../mapping/primary-campaign/primary-campaign-mapping'

defineProps<{
  campaign: ITideSecondaryCampaign
}>()
</script>

<template>
  <RplSecondaryCampaign
    :title="campaign.title"
    :link="campaign.cta"
    :image="campaign.image"
  >
    <RplContent :html="campaign.summaryHtml" />
    <template #meta>
      {{ campaign.imageCaption }}
    </template>
  </RplSecondaryCampaign>
</template>
