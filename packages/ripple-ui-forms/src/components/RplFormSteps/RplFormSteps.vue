<template>
  <FormKit
    :id="id"
    :name="id"
    :disabled="disabled"
    type="multi-step"
    tab-style="progress"
    :allow-incomplete="true"
    :before-step-change="handleStepChange"
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
          v-for="(step, index) in schema"
          :id="step.key"
          :key="step.key"
          :form="id"
          :data="data"
          :number="index + 1"
          :total="schema.length"
          :name="step.key"
          :title="step.title"
          :schema="step.schema"
          :errors="errors"
          :nextButton="step.nextButton"
          :prevButton="step.prevButton"
          :activeStep="activeStep"
          :beforeStepChange="step.beforeStepChange"
        />
      </div>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { BeforeStepChange } from '@formkit/addons'
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

const progressSteps =
  props.schema &&
  props.schema
    .filter((item: RplFormKitStepNode) => item.$step && !item.parentStep)
    .map(({ id, title }) => ({ id, label: title }))

const getActiveStep = (activeStep: string) => {
  const currentStep = props.schema?.find(
    (step) => step.key === activeStep || step.name === activeStep
  )

  if (!currentStep?.parentStep) {
    return activeStep
  }

  return currentStep.parentStep
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
