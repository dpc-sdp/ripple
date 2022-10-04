<script lang="ts">
export default { name: 'TideGrantOverview' }
</script>

<template>
  <div class="tide-grant__overview">
    <h2 class="tide-grant__title rpl-type-h2">{{ overview.title }}</h2>
    <ol class="tide-grant__overview-items">
      <li
        v-if="formattedFunding"
        class="
          tide-grant__overview-item tide-grant__overview-item--funding
          rpl-type-label
        "
      >
        <rpl-icon name="icon-dollar-circle-filled"></rpl-icon
        ><span class="rpl-list__label">
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
        ><span class="rpl-list__label"> {{ overview.audience }}</span>
      </li>
      <li
        v-if="overview.date"
        class="
          tide-grant__overview-item tide-grant__overview-item--status
          rpl-type-label
        "
      >
        <rpl-icon name="icon-cancel-circle-filled" colour="error"></rpl-icon
        ><span class="rpl-list__label"> {{ formattedDate }} </span>
      </li>
      <li
        class="tide-grant__overview-item tide-grant__overview-item--description"
      >
        <p class="rpl-type-p">
          {{ overview.description }}
        </p>
      </li>
      <li v-if="overview.link">
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

const props =
  defineProps<{
    overview: TideGrantOverview
  }>()

const formattedFunding = computed(() => {
  const formatOptions = {
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

const formattedDate = computed(() => {
  if (props.overview.ongoing) {
    return 'Ongoing'
  }

  const now = new Date()
  const to = new Date(props.overview.date.to)
  const from = new Date(props.overview.date.from)

  if (now < to) {
    if (from < now) {
      // calculate days remaining
      const days = Math.floor(
        to.valueOf() / 86400000 - now.valueOf() / 86400000
      )
      if (days > 0) {
        return `Open, closing in ${days} day${days > 1 ? 's' : ''}`
      } else {
        return 'Open, closing today'
      }
    } else {
      return `Opening on ${new Intl.DateTimeFormat('default', {
        dateStyle: 'long'
      }).format(from)}`
    }
  }
  return 'Closed'
})
</script>

<style src="./tide-grant-overview.css" />
