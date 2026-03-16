<template>
  <FormKit
    :id="id"
    :name="id"
    :disabled="disabled"
    type="multi-step"
    tab-style="progress"
    :allow-incomplete="true"
  >
    <template #tabs="{ activeStep }">
      <RplProgress
        v-if="layout === 'default'"
        :id="`${id}-progress`"
        class="rpl-form__progress rpl-col-4-m rpl-col-12"
        :current-step-id="getActiveStep(activeStep)"
        :auto-expandable="true"
        :steps="progressSteps"
      />
    </template>
    <template #steps="{ activeStep }">
      <div
        ref="formStepsRef"
        tabindex="-1"
        class="rpl-form__steps rpl-col-7-m rpl-col-start-6-m rpl-col-12"
      >
        <RplFormStep
          v-for="step in schema"
          :id="step.key"
          :key="step.key"
          :form="id"
          :data="data"
          :number="getStepNumber(step)"
          :total="progressSteps.length"
          :name="step.key"
          :title="step.title"
          :schema="step.schema"
          :errors="errors"
          :nextButton="step.nextButton"
          :prevButton="step.prevButton"
          :activeStep="activeStep"
          :beforeStepChange="(data: StepChangeData) => handleStep(data, step)"
        />
      </div>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { BeforeStepChange, StepChangeData } from '@formkit/addons'
import { RplFormKitStepNode } from '../../types'
import RplFormStep from './../RplFormStep/RplFormStep.vue'
import RplProgress from '@dpc-sdp/ripple-ui-core/components/progress/RplProgress.vue'

interface Props {
  id: string
  data?: object
  schema?: RplFormKitStepNode[]
  errors?: {
    fieldId: string
    text: string
  }[]
  disabled?: boolean
  handleStepChange: BeforeStepChange
  layout?: 'default' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
  data: () => ({}),
  errors: () => [],
  layout: 'default'
})

const formStepsRef = ref<HTMLElement>()
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

// Runs the primary step change check i.e., check for error messages
// followed by an optional custom step change check
const handleStep = async (data: StepChangeData, step: RplFormKitStepNode) => {
  const isStepAllowed = await props.handleStepChange(data)

  if (!isStepAllowed) {
    return false
  }

  if (typeof step?.beforeStepChange === 'function') {
    return step.beforeStepChange(data)
  }

  return true
}

const progressSteps = computed(() => {
  return (props.schema || [])
    .filter((item: RplFormKitStepNode) => item.$step && !item.parentStep)
    .map(({ id, title }) => ({ id, label: title }))
})

// Returns either the active step id or the parent step id if present
const getActiveStep = (activeStep: string) => {
  const schema = props.schema || []
  let index = schema.findIndex(
    (item: RplFormKitStepNode) => item.id === activeStep
  )

  if (schema[index]?.parentStep) {
    return schema[index].parentStep
  }

  return activeStep
}

// Returns the current step number, this maybe the parent step number if present
const getStepNumber = (step: RplFormKitStepNode) => {
  const id = step.parentStep || step.id

  return progressSteps.value.findIndex((item) => item.id === id) + 1
}

const focus = () => {
  if (formStepsRef.value) {
    formStepsRef.value?.focus({ preventScroll: true })

    const navHeight = 92
    const positionTop = formStepsRef.value?.getBoundingClientRect().top

    if (positionTop < 0) {
      window.scrollTo({
        top: positionTop + window.scrollY - navHeight,
        behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
      })
    }
  }
}

defineExpose({ focus })
</script>

<style src="./RplFormSteps.css"></style>
