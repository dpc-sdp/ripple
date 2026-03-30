<template>
  <FormKit
    :id="id"
    type="step"
    :name="name"
    :label="title"
    :input-errors="inputErrors"
    :previous-label="prevButton"
    :next-label="nextButton"
    :before-step-change="beforeStepChange"
    @node="setStepNode"
  >
    <button
      v-if="(number > 1 || parentStep) && prevButton"
      type="button"
      class="rpl-form__step-prev rpl-u-focusable-block rpl-type-p rpl-u-margin-b-8"
      @click="handleBack"
    >
      <RplIcon name="icon-arrow-left" colour="default" size="xs" />
      {{ prevButton }}
    </button>

    <div class="rpl-form__step-count rpl-type-p rpl-type-weight-bold">
      Step {{ number }} of {{ total }}
    </div>
    <h3
      :id="`${form}_tab_${number - 1}`"
      class="rpl-form__step-title rpl-type-h2"
    >
      {{ title }}
    </h3>

    <RplFormAlert
      v-if="errors.length"
      ref="stepErrorsRef"
      status="error"
      title="There is a problem"
      :fields="errors"
      data-component-type="form-error-summary"
    >
      Please correct the following fields and try again.
    </RplFormAlert>

    <FormKitSchema v-if="schema" :schema="schema" :data="data" />

    <template #stepPrevious></template>
    <template #stepNext="{ handlers, node }">
      <RplButton
        v-if="!node.context.isLastStep && nextButton"
        class="rpl-form__step-next"
        variant="filled"
        @click="handlers.next"
      >
        {{ nextButton }}
      </RplButton>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import { inject, nextTick, type Ref, ref, watch } from 'vue'
import {
  type FormKitNode,
  type FormKitSchemaCondition,
  type FormKitSchemaNode
} from '@formkit/core'
import useFormFocus from '../../composables/useFormFocus'
import { useEventContext } from '@dpc-sdp/ripple-ui-core'
import RplFormAlert from './../RplFormAlert/RplFormAlert.vue'
import { IRplFormProvidedState } from '../../types'
import type { BeforeStepChange } from '@formkit/addons'

interface Props {
  form: string
  id: string
  name: string
  title: string
  number: number
  total: number
  data?: object
  prevButton?: string
  nextButton?: string
  parentStep?: string
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  errors?: {
    fieldId: string
    text: string
  }[]
  activeStep: string | undefined
  beforeStepChange?: BeforeStepChange
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
  nextButton: 'Continue',
  prevButton: 'Back',
  parentStep: undefined,
  data: () => ({}),
  errors: () => [],
  beforeStepChange: undefined
})

const { focusFormElement } = useFormFocus()
const formEl: IRplFormProvidedState | undefined = inject('form')

const stepErrorsRef = ref(null)
const stepNodeRef = ref<FormKitNode | null>(null)
const inputErrors: Ref<Record<string, string[]>> | undefined =
  inject('inputErrors')

const setStepNode = (node: FormKitNode) => {
  stepNodeRef.value = node
}

const handleBack = () => {
  const stepsNode = stepNodeRef.value?.parent

  if (!stepsNode) {
    return
  }

  if (typeof (stepsNode as any).previous === 'function') {
    ;(stepsNode as any).previous()
    return
  }

  stepsNode.context?.handlers?.previous?.()
}

useEventContext({
  contextStep: props.title,
  contextIndex: props.number
})

// Scroll to and focus step errors when they appear
watch(
  () => props.errors,
  async (newErrors) => {
    if (newErrors.length && props.activeStep === props.name) {
      await nextTick()

      stepErrorsRef.value?.focus()
    }
  }
)

// Check if we need to focus a step field when step becomes active
watch(
  () => props.activeStep,
  async (newStep) => {
    if (newStep === props.name && formEl?.focusStepField.value) {
      await nextTick()

      focusFormElement(formEl.focusStepField.value)

      formEl.focusStepField.value = null
    }
  }
)
</script>

<style src="./RplFormStep.css"></style>
