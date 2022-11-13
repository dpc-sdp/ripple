<script lang="ts">
export default { name: 'TideGrantOverview' }
</script>

<template>
  <div class="tide-grant__overview">
    <h2 class="tide-grant__title rpl-type-h2-fixed rpl-u-margin-b-6">
      {{ overview.title }}
    </h2>
    <ol class="tide-grant__overview-items">
      <li
        v-if="formattedFunding"
        data-cy="funding"
        class="
          tide-grant__overview-item tide-grant__overview-item--funding
          rpl-type-label
        "
      >
        <rpl-icon colour="default" name="icon-dollar-circle-filled"></rpl-icon
        ><span class="rpl-type-h4-fixed">
          {{ formattedFunding }}
        </span>
      </li>
      <li
        v-if="overview.audience"
        class="
          tide-grant__overview-item tide-grant__overview-item--audience
          rpl-type-label
        "
      >
        <rpl-icon colour="default" name="icon-user-circle-filled"></rpl-icon
        ><span class="rpl-type-h4-fixed"> {{ overview.audience }}</span>
      </li>
      <li
        class="
          tide-grant__overview-item tide-grant__overview-item--status
          rpl-type-label
        "
      >
        <rpl-icon
          v-if="
            grantStatus.status === 'open' ||
            grantStatus.status === 'opening_soon'
          "
          name="icon-check-circle-filled"
          colour="success"
          data-cy="statusIcon"
        ></rpl-icon
        ><rpl-icon
          v-else
          name="icon-cancel-circle-filled"
          colour="error"
          data-cy="statusIcon"
        ></rpl-icon
        ><span class="rpl-type-h4-fixed" data-cy="statusText">
          {{ grantStatus.displayLabel }}
        </span>
      </li>
      <li
        v-if="overview.description"
        class="
          tide-grant__overview-item tide-grant__overview-item--description
          rpl-type-p
        "
      >
        <rpl-content :html="overview.description"></rpl-content>
      </li>
      <li
        v-if="overview.link"
        class="tide-grant__overview-item tide-grant__overview-item--link"
      >
        <rpl-button el="a" :href="overview.link.uri">{{
          overview.link.title
        }}</rpl-button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TideGrantOverview } from '../types'
import {
  RplButton,
  RplIcon,
  RplContent,
  getGrantStatus
} from '@dpc-sdp/ripple-ui-core'

const props =
  defineProps<{
    overview: TideGrantOverview
  }>()

const formattedFunding = computed(() => {
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    minimumFractionDigits: 0,
    currency: 'AUD'
  }
  if (props.overview.funding.from >= 0 && props.overview.funding.to >= 0) {
    if (
      props.overview.funding.from === props.overview.funding.to ||
      props.overview.funding.to === 0
    ) {
      return new Intl.NumberFormat('en-AU', formatOptions).format(
        props.overview.funding.from
      )
    } else {
      return [
        new Intl.NumberFormat('en-AU', formatOptions).format(
          props.overview.funding.from
        ),
        new Intl.NumberFormat('en-AU', formatOptions).format(
          props.overview.funding.to
        )
      ].join(' - ')
    }
  }
  return null
})

const now = new Date()

const grantStatus = computed(() => {
  return getGrantStatus(
    now,
    props.overview.ongoing,
    props.overview.date.from,
    props.overview.date.to
  )
})
</script>

<style src="./tide-grant-overview.css" />
