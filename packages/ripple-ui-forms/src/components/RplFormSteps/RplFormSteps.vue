<template>
  <FormKit
    :id="id"
    :name="id"
    :disabled="disabled"
    type="multi-step"
    tab-style="progress"
    :allow-incomplete="false"
    :before-step-change="handleStepChange"
  >
    <template #tabs="{ steps, activeStep }">
      <RplProgress
        v-if="layout === 'default'"
        :id="`${id}-progress`"
        class="rpl-form__progress rpl-col-4-m rpl-col-12"
        :current-step-id="activeStep"
        :auto-expandable="true"
        :steps="getProgress(steps)"
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
        />
      </div>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import { FormKitSchemaNode } from '@formkit/core'
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

interface Props {
  id: string
  data?: object
  schema?: {
    id: string
    key: string
    name: string
    title: string
    nextButton: string
    prevButton: string
    schema: FormKitSchemaNode
  }[]
  errors?: {
    fieldId: string
    text: string
  }[]
  disabled?: boolean
  handleStepChange: (step: FormKitSchemaNode) => boolean
  layout?: 'default' | 'compact'
}

withDefaults(defineProps<Props>(), {
  schema: undefined,
  data: () => ({}),
  errors: () => [],
  layout: 'default'
})

const formStepsRef = ref<HTMLElement>()
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const getProgress = (steps = []) => {
  return (steps || []).map(({ id, stepName }) => ({
    id,
    label: stepName
  }))
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
