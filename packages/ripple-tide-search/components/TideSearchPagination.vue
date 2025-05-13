<template>
  <RplPagination
    v-if="totalPages > 1"
    :currentPage="currentPage"
    :totalPages="totalPages"
    @change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { scrollToElementTopWithOffset } from '#imports'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
const emit = defineEmits<{
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
}>()

interface Props {
  currentPage: number
  totalPages: number
  scrollToSelector?: string
}

const props = withDefaults(defineProps<Props>(), {
  scrollToSelector: '.rpl-layout__body-wrap'
})

const handlePageChange = (event) => {
  const navHeight = 92
  const scrollToElement = document.querySelector(
    props.scrollToSelector
  ) as HTMLElement

  if (scrollToElement) {
    scrollToElementTopWithOffset(scrollToElement, navHeight)
    scrollToElement.focus?.({ preventScroll: true })
  }
  emit('paginate', event)
}
</script>
