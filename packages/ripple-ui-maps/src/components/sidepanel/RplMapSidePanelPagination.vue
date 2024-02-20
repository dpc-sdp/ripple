<template>
  <RplPagination
    v-if="totalPages > 1"
    :currentPage="currentPage"
    :totalPages="totalPages"
    variant="simple"
    class="rpl-map-side-panel__pagination"
    @change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { RplPagination } from '@dpc-sdp/ripple-ui-core/vue'
import { rplEventPayload, useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import { nextTick } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  scrollToSelector: string
}

const props = withDefaults(defineProps<Props>(), {
  scrollToSelector: '.rpl-map-side-panel__wrapper'
})

const emit = defineEmits<{
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-side-panel', emit)

const handlePageChange = async (event) => {
  const scrollToElement = document.querySelector(props.scrollToSelector)

  emitRplEvent('paginate', event, { global: true })

  if (scrollToElement) {
    await nextTick()
    scrollToElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}
</script>
