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

interface Props {
  currentPage: number
  totalPages: number
  scrollParentSelector: string
}

withDefaults(defineProps<Props>(), {
  scrollParentSelector: '.rpl-map-side-panel__wrapper'
})

const emit = defineEmits<{
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-side-panel', emit)

const handlePageChange = async (event) => {
  emitRplEvent('paginate', event, { global: true })
}
</script>
