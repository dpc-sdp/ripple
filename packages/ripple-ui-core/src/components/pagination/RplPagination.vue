<script setup lang="ts">
import RplPaginationLink from './RplPaginationLink.vue'
import { rplEventBus } from '../../index'
import { useStepNavigation } from '../../composables/useStepNavigation'
import { computed, watch } from 'vue'

rplEventBus.register('rpl-pagination/click')
const emit = defineEmits<{ (e: 'change', value: number): void }>()

const RplPaginationVariants = ['complex', 'simple'] as const

interface Props {
  label?: string
  totalPages: number
  currentPage?: number
  surroundingPages?: number
  contentType?: string
  showTally?: boolean
  variant?: (typeof RplPaginationVariants)[number]
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  currentPage: 1,
  surroundingPages: 2,
  contentType: undefined,
  showTally: false,
  variant: 'complex'
})

const totalSteps = computed(() => props.totalPages)

const { activeStep, visibleSteps, updateStep, isFirstStep, isLastStep } =
  useStepNavigation({
    totalSteps,
    currentStep: props.currentPage,
    surroundingSteps: props.surroundingPages
  })

watch(
  () => props.currentPage,
  (step) => updateStep(step)
)

const onClick = (payload: any, index: number) => {
  updateStep(index)
  emit('change', index)
  rplEventBus.emit('rpl-pagination/click', payload)
}

const isComplex = computed(() => props.variant === 'complex')
const iconSize = computed(() => (isComplex.value ? 's' : 'xs'))
</script>

<template>
  <nav
    :class="`rpl-pagination rpl-pagination--${variant}  rpl-u-screen-only`"
    :aria-label="label"
  >
    <p
      v-if="showTally && !isComplex"
      class="rpl-pagination__tally rpl-type-label"
    >
      {{ activeStep }} of {{ totalPages }}
    </p>
    <RplPaginationLink
      v-if="!isComplex || !isFirstStep"
      icon-name="icon-arrow-left"
      :icon-size="iconSize"
      :aria-label="`Go to previous ${contentType}`"
      :disabled="!isComplex && isFirstStep"
      @click="(e) => onClick(e, activeStep - 1)"
    >
      Previous
    </RplPaginationLink>
    <ol v-if="isComplex" class="rpl-pagination__list">
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
      v-if="!isComplex || !isLastStep"
      icon-name="icon-arrow-right"
      icon-placement="after"
      :icon-size="iconSize"
      :aria-label="`Go to next ${contentType}`"
      :disabled="!isComplex && isLastStep"
      @click="(e) => onClick(e, activeStep + 1)"
    >
      Next
    </RplPaginationLink>
  </nav>
</template>

<style src="./RplPagination.css" />
