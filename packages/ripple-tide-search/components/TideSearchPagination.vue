<template>
  <RplPagination
    v-if="totalPages > 1"
    :currentPage="currentPage"
    :totalPages="totalPages"
    @change="handlePageChange"
  />
</template>

<script setup lang="ts">
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
  emitSearchEvent: Function
}

const props = defineProps<Props>()

function scrollToElementTopWithOffset(element, offset) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY
  const scrollToPosition = elementTop - offset

  window.scrollTo({
    top: scrollToPosition,
    behavior: 'smooth'
  })
}

const handlePageChange = (event) => {
  const navHeight = 92
  const layoutBody = document.querySelector('.rpl-layout__body-wrap')

  if (layoutBody) {
    scrollToElementTopWithOffset(layoutBody, navHeight)
  }
  emit('paginate', event)
}
</script>
