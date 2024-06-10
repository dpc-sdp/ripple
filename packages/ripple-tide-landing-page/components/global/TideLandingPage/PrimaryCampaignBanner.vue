<script setup lang="ts">
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
    <template v-if="campaign.imageCaption" #meta>
      {{ campaign.imageCaption }}
    </template>
  </RplPrimaryCampaign>
</template>
