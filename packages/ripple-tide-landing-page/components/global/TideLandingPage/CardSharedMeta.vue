<template>
  <RplTag v-if="contentTypeLabel" :label="contentTypeLabel" variant="neutral" />
  <span v-if="!contentTypeLabel && meta.topic" class="rpl-card__topic">{{
    meta.topic
  }}</span>
  <template v-if="isGrant && grantStatus">
    <span class="rpl-card__status">
      <RplIcon
        v-if="
          grantStatus.status === 'open' || grantStatus.status === 'opening_soon'
        "
        class="rpl-icon--colour-success"
        name="icon-check-circle-filled"
      />
      <RplIcon
        v-else
        class="rpl-icon--colour-error"
        name="icon-cancel-circle-filled"
      />
      <span>{{ grantStatus.displayLabel }}</span>
    </span>
  </template>
  <template v-else>
    <template v-if="meta.fvRecommendationStatus">
      <span>{{ meta.fvRecommendationStatus }}</span>
    </template>
    <template v-if="meta.dateStart">
      <span>{{ formattedDate }}</span>
    </template>
    <template v-if="meta.publishDate">
      <span>{{ formattedPublishDate }}</span>
    </template>
    <template v-if="meta.inductionYear">
      <span>{{ meta.inductionYear }}</span>
    </template>
  </template>
</template>

<script setup lang="ts">
import { formatDate, getGrantStatus } from '#imports'
import { formatDateRange } from '@dpc-sdp/ripple-ui-core'
import { computed } from 'vue'
import { ITideCardMeta } from '../../../mapping/page-components/generic-card-mapping'
import getContentTypeLabel from '../../../utils/getContentTypeLabel.js'

interface Props {
  meta: ITideCardMeta
}

const props = withDefaults(defineProps<Props>(), {})

const contentTypeLabel = computed(() => {
  return getContentTypeLabel(props.meta.contentType)
})

const isGrant = computed(() => {
  return contentTypeLabel.value.toLowerCase() === 'grant'
})

const formattedDate = computed(() => {
  if (props.meta.dateStart && props.meta.dateEnd) {
    return formatDateRange({
      from: props.meta.dateStart,
      to: props.meta.dateEnd
    })
  } else if (props.meta.dateStart) {
    return formatDate(props.meta.dateStart)
  } else {
    return ''
  }
})

const formattedPublishDate = computed(() =>
  formatDate(props.meta.publishDate, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
)

const now = new Date()

const grantStatus = computed(() => {
  return getGrantStatus(
    now,
    props.meta.isGrantOngoing,
    props.meta.dateStart,
    props.meta.dateEnd
  )
})
</script>
