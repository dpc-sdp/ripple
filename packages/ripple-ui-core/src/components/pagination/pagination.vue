<script lang="ts">
export default { name: 'RplPagination' }
</script>

<script setup lang="ts">
import RplPaginationLink from './pagination-link.vue'
import { rplEventBus } from '../../index'
import { useStepNavigation } from '../../composables/useStepNavigation'

rplEventBus.register('rpl-pagination/click')
const emit = defineEmits<{ (e: 'change', value: number): void }>()

interface Props {
  label?: string
  totalPages: number
  initialPage?: number
  surroundingPages?: number
  contentType?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  initialPage: 1,
  surroundingPages: 2,
  contentType: undefined
})

const { activeStep, visibleSteps, updateStep, isFirstStep, isLastStep } =
  useStepNavigation({
    totalSteps: props.totalPages,
    initialStep: props.initialPage,
    surroundingSteps: props.surroundingPages
  })

const onClick = (payload: any, index: number) => {
  updateStep(index)
  emit('change', index)
  rplEventBus.emit('rpl-pagination/click', payload)
}
</script>

<template>
  <nav class="rpl-pagination" :aria-label="label">
    <RplPaginationLink
      v-if="!isFirstStep"
      icon-name="icon-arrow-left"
      :aria-label="`Go to previous ${contentType}`"
      @click="(e) => onClick(e, activeStep - 1)"
    >
      Previous
    </RplPaginationLink>
    <ol class="rpl-pagination__list">
      <li
        v-for="(step, index) in visibleSteps"
        :key="index"
        class="rpl-pagination__list-item rpl-type-label"
      >
        <button
          v-if="step"
          class="rpl-pagination__page rpl-u-focusable-block"
          :aria-label="`Go to ${contentType} ${step}`"
          :aria-current="step === activeStep ? true : null"
          @click="(e) => onClick(e, step)"
        >
          <span>{{ step }}</span>
        </button>
        <span v-else class="rpl-pagination__spacer">
          <span>{{ '&hellip;' }}</span>
        </span>
      </li>
    </ol>
    <RplPaginationLink
      v-if="!isLastStep"
      icon-name="icon-arrow-right"
      icon-placement="after"
      :aria-label="`Go to next ${contentType}`"
      @click="(e) => onClick(e, activeStep + 1)"
    >
      Next
    </RplPaginationLink>
  </nav>
</template>

<style src="./pagination.css" />
