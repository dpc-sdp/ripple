<template>
  <div
    :class="{
      'rpl-table': true,
      'rpl-data-table': true,
      'rpl-data-table--mobile': displayMobileView,
      'tide-search-results-table-skeleton': true,
      'tide-search-results-table-skeleton--mounting': !isMounted
    }"
  >
    <div
      class="rpl-table__scroll-container rpl-u-focusable-outline--visible"
      tabindex="0"
    >
      <table>
        <thead>
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="`skeleton-table-th-${index}`"
              :class="col.classes"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody
          v-for="index in perPage"
          :key="`skeleton-table-row-${index}`"
          class="rpl-data-table__row"
        >
          <tr>
            <td v-for="(col, i) in columns" :key="`skeleton-table-col-${i}`">
              <component
                :is="col.skeleton"
                v-if="col.skeleton"
                class="tide-search-results-table-skeleton__cell rpl-type-p"
                width="l"
              />
              <RplSkeleton
                v-else
                class="tide-search-results-table-skeleton__cell rpl-type-p"
                width="l"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

interface Props {
  columns?: {
    label: string
    classes: string[]
    skeleton?: string
  }[]
  perPage?: number
  hasSidebar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  perPage: 12,
  hasSidebar: false
})

const isMounted = ref(false)
const breakpoints = useBreakpoints(bpMin)
const isUpToMediumScreen = breakpoints.smaller('m')
const isUpToLargeScreen = breakpoints.smaller('l')

const displayMobileView = computed(() => {
  if (!isMounted.value) return false

  return props.hasSidebar ? unref(isUpToLargeScreen) : unref(isUpToMediumScreen)
})

onMounted(() => (isMounted.value = true))
</script>

<style>
.tide-search-results-table-skeleton--mounting {
  visibility: hidden;
}
</style>
