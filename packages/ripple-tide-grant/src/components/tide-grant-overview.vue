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
        <rpl-icon name="icon-dollar-circle-filled"></rpl-icon
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
        <rpl-icon name="icon-user-circle-filled"></rpl-icon
        ><span class="rpl-type-h4-fixed"> {{ overview.audience }}</span>
      </li>
      <li
        v-if="overview.date"
        class="
          tide-grant__overview-item tide-grant__overview-item--status
          rpl-type-label
        "
      >
        <rpl-icon
          v-if="openState"
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
          {{ formattedDate }}
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
import type { TideGrantOverview } from '../../types'
import { RplButton, RplIcon, RplContent } from '@dpc-sdp/ripple-ui-core'

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

const to = new Date(props.overview.date.to)
const now = new Date()

const openState = computed(
  () => props.overview.ongoing || !props.overview.date.to || now < to
)

const formattedDate = computed(() => {
  if (props.overview.ongoing) {
    return 'Ongoing'
  }

  if (props.overview.date.to) {
    if (now > to) {
      return 'Closed'
    }

    const from = new Date(props.overview.date.from)

    if (from < now) {
      // Calculate days remaining
      const days = Math.floor(
        to.valueOf() / 86400000 - now.valueOf() / 86400000
      )

      if (days > 0) {
        return `Open, closing in ${new Intl.NumberFormat('en-AU').format(
          days
        )} day${days > 1 ? 's' : ''}`
      } else {
        return 'Open, closing today'
      }
    } else {
      return `Opening on ${new Intl.DateTimeFormat('default', {
        dateStyle: 'long'
      }).format(from)}`
    }
  }

  return 'Ongoing'
})
</script>

<style src="./tide-grant-overview.css" />
