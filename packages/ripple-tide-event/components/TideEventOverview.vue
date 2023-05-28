<template>
  <RplPageComponent>
    <h2 class="tide-event__title rpl-type-h2-fixed rpl-u-margin-b-6">
      <RplIcon colour="default" size="m" name="icon-calendar-lined"></RplIcon>
      <span>Event Details</span>
    </h2>

    <RplDescriptionList>
      <RplDescriptionListItem v-if="displayDate" term="Date:">
        {{ displayDate }}
      </RplDescriptionListItem>
      <RplDescriptionListItem
        v-for="item in overviewList"
        :key="item.term"
        :term="item.term"
      >
        {{ item.description }}
      </RplDescriptionListItem>
      <RplDescriptionListItem v-if="link" term="Website:">
        <RplTextLink class="rpl-type-label" :url="link.url">{{
          link.url
        }}</RplTextLink>
      </RplDescriptionListItem>
      <RplDescriptionListItem v-if="details.length > 0" term="Details:">
        <ul data-component-type="tide-event__details">
          <li
            v-for="(feature, i) in details"
            :key="i"
            class="tide-event__feature"
          >
            {{ expandDetail(feature) }}
          </li>
        </ul>
      </RplDescriptionListItem>
    </RplDescriptionList>
  </RplPageComponent>
  <RplPageComponent>
    <RplContent :html="description"></RplContent>
  </RplPageComponent>
</template>

<script setup lang="ts">
import { TideEventLink, TideEventDate } from '../types'
import { formatDateRange } from '@dpc-sdp/ripple-ui-core'
import { expandDetail } from '#imports'
import { computed } from 'vue'

interface Props {
  description: any
  overview: any
  details: string[]
  link: TideEventLink
  date: TideEventDate
  showTime: boolean
}

const props = defineProps<Props>()

const displayDate = computed(() =>
  formatDateRange(props.date, { weekday: 'long' }, props.showTime)
)

// Location, Price
const overviewList = computed(() =>
  props.overview
    .filter((item) => item.description)
    .sort((a, b) => (a.term.charAt(0) < b.term.charAt(0) ? -1 : 1))
)
</script>

<style>
.tide-event__title,
.tide-event__overview-item {
  display: flex;
  gap: var(--rpl-sp-3);
  align-items: center;
}

.tide-event__title {
  margin-bottom: var(--rpl-sp-4);
}

.tide-event__feature {
  margin-bottom: var(--rpl-sp-3);
}
</style>
