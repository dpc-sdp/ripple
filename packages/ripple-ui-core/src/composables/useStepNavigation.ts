import { computed, ref } from 'vue'

interface RplStepNavigation {
  initialStep: number
  surroundingSteps: number
  totalSteps: number
}

export function useStepNavigation({
  initialStep,
  surroundingSteps,
  totalSteps
}: RplStepNavigation) {
  const activeStep = ref(initialStep)

  const addEdges = computed(() => surroundingSteps > 2)
  const stepRange = computed(() => surroundingSteps * 2 + 1)
  const isFirstStep = computed(() => activeStep.value === 1)
  const isLastStep = computed(() => activeStep.value === totalSteps)

  function updateStep(step: number) {
    activeStep.value = step
  }

  // Figure of the visible step range and check if we need to show the first and last pages
  function getSteps() {
    let start = Math.max(1, Math.round(activeStep.value - stepRange.value / 2))
    const hasFirst = addEdges.value && start > 1
    const end = Math.min(start + stepRange.value - 1, totalSteps)
    const hasLast = addEdges.value && end < totalSteps

    if (end - start + 1 < stepRange.value) {
      start = Math.max(1, end - stepRange.value + 1)
    }

    return {
      hasFirst,
      hasLast,
      start: hasFirst ? start + 1 : start,
      end: hasLast ? end - 1 : end
    }
  }

  // Get all visible steps to return to the consumer
  const visibleSteps = computed(() => {
    const steps: (any | null)[] = []
    const { hasFirst, hasLast, start, end } = getSteps()

    if (hasFirst) steps.push(1)

    for (let i = start; i <= end; i += 1) {
      // Check if we need to display this step as a truncated divider i.e …
      const firstSpacer = i === start && hasFirst && i > 2
      const lastSpacer = i === end && hasLast && i < totalSteps - 1

      steps.push(firstSpacer || lastSpacer ? null : i)
    }

    if (hasLast) steps.push(totalSteps)

    return steps
  })

  return {
    activeStep,
    visibleSteps,
    updateStep,
    isFirstStep,
    isLastStep
  }
}
