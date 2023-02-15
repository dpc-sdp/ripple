<script setup lang="ts">
import { RplCampaignBannerPrimaryCampaign as RplPrimaryCampaign } from '#components'
import { ITidePrimaryCampaign } from '../../../mapping/primary-campaign/primary-campaign-mapping'

defineProps<{
  campaign: ITidePrimaryCampaign
}>()
</script>

<template>
  <RplPrimaryCampaign
    :title="campaign.title"
    :link="campaign.cta"
    :image="campaign.image"
    data-cy="primary-campaign"
  >
    <RplContent :html="campaign.summaryHtml" data-cy="summary" />
    <template #meta>
      {{ campaign.imageCaption }}
    </template>
  </RplPrimaryCampaign>
</template>
