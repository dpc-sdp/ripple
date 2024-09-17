<template>
  <div class="tide-publication-page__links rpl-u-margin-t-9">
    <RplPageLinks>
      <RplPageLinksItem
        v-if="pagination.prev?.url"
        direction="prev"
        :label="pagination.prev.label"
        :url="pagination.prev.url"
        :global-events="false"
        @paginate="(event) => handleClick(pagination.prev, event)"
      >
        {{ pagination.prev.description }}
      </RplPageLinksItem>
      <RplPageLinksItem
        v-if="pagination.next?.url"
        direction="next"
        :label="pagination.next.label"
        :url="pagination.next.url"
        :global-events="false"
        @paginate="(event) => handleClick(pagination.next, event)"
      >
        {{ pagination.next.description }}
      </RplPageLinksItem>
    </RplPageLinks>
  </div>
</template>

<script setup lang="ts">
import {
  indexNode,
  TidePublicationPagination,
  TidePublicationPaginationLink
} from '../types'
import { flattenMenu } from '#imports'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  pagination: TidePublicationPagination
  navigation: indexNode[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'paginate', payload: rplEventPayload): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-page-links', emit)

const handleClick = (
  paginate: TidePublicationPaginationLink,
  payload: rplEventPayload
) => {
  const menu = flattenMenu(props.navigation)

  emitRplEvent(
    'paginate',
    {
      ...payload,
      name: paginate.description,
      count: menu.length,
      index: menu.findLastIndex((item) => item.active) + 1
    },
    { global: true }
  )
}
</script>
