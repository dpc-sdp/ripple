<template>
  <RplLayoutPageComponent>
    <h2 class="tide-event__title rpl-type-h2-fixed rpl-u-margin-b-6">
      <RplIcon colour="default" size="m" name="icon-calendar-lined"></RplIcon>
      <span>Event Details</span>
    </h2>

    <dl class="rpl-description-list rpl-type-p">
      <template v-if="displayDate">
        <dt class="rpl-description-list__term">Date:</dt>
        <dd class="rpl-description-list__description">
          {{ displayDate }}
        </dd>
      </template>
      <template v-for="item in overview" :key="item.term">
        <dt class="rpl-description-list__term">{{ item.term }}</dt>
        <dd class="rpl-description-list__description">
          {{ item.description }}
        </dd>
      </template>
      <template v-if="link">
        <dt class="rpl-description-list__term">Booking:</dt>
        <dd class="rpl-description-list__description">
          <RplTextLink class="rpl-type-label" :url="link.url">{{
            link.url
          }}</RplTextLink>
        </dd>
      </template>
      <template v-if="details.length > 0">
        <dt class="rpl-description-list__term">Details:</dt>
        <dd
          class="rpl-description-list__description"
          data-component-type="tide-event__details"
        >
          <ul>
            <li
              v-for="(feature, i) in details"
              :key="i"
              class="tide-event__feature"
            >
              {{ expandDetail(feature) }}
            </li>
          </ul>
        </dd>
      </template>
    </dl>
  </RplLayoutPageComponent>
  <RplLayoutPageComponent>
    <RplContent :html="description"></RplContent>
  </RplLayoutPageComponent>
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
  formatDateRange(props.date, {}, props.showTime)
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
