<script setup lang="ts">
import { RplCampaignBannerSecondaryCampaign as RplSecondaryCampaign } from '#components'
import { ITideSecondaryCampaign } from '../../../mapping/secondary-campaign/secondary-campaign-mapping'

defineProps<{
  campaign: ITideSecondaryCampaign
}>()
</script>

<template>
  <RplSecondaryCampaign
    :title="campaign.title"
    :link="campaign.cta"
    :image="campaign.image"
    data-cy="secondary-campaign"
  >
    <RplContent :html="campaign.summaryHtml" data-cy="summary" />
    <template #meta>
      {{ campaign.imageCaption }}
    </template>
  </RplSecondaryCampaign>
</template>
