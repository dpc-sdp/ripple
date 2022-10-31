<script setup lang="ts">
import { RplPrimaryCampaign } from '@dpc-sdp/ripple-ui-core'
import { ITideCampaign } from '../mapping/primary-campaign/primary-campaign-mapping'

defineProps<{
  campaign: ITideCampaign
}>()
</script>

<template>
  <RplPrimaryCampaign
    :title="campaign.title"
    :link="campaign.cta"
    :image="campaign.image"
  >
    <RplContent :html="campaign.summaryHtml" />
    <template #meta>
      {{ campaign.imageCaption }}
    </template>
  </RplPrimaryCampaign>
</template>
