<template>
  <FormKit
    :id="id"
    type="step"
    :name="name"
    :label="title"
    :input-errors="inputErrors"
    :previous-label="prevButton"
    :next-label="nextButton"
  >
    <button
      v-if="number > 1"
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
    <h3 class="rpl-form__step-title rpl-type-h2">
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
        v-if="!node.context.isLastStep"
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
  type FormKitSchemaCondition,
  type FormKitSchemaNode,
  getNode
} from '@formkit/core'
import useFormFocus from '../../composables/useFormFocus'
import { useEventContext } from '@dpc-sdp/ripple-ui-core'

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
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  errors?: {
    fieldId: string
    text: string
  }[]
  activeStep: string | undefined
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
  nextButton: 'Continue',
  prevButton: 'Back',
  data: () => ({}),
  errors: () => []
})

const { focusFormElement } = useFormFocus()
const formEl: { focusStepField: Ref<string> } = inject('form')

const stepErrorsRef = ref(null)
const inputErrors: Ref<Record<string, string>> = inject('inputErrors')

const handleBack = () => getNode(props.form)?.previous()

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
    if (newStep === props.name && formEl.focusStepField.value) {
      await nextTick()

      focusFormElement(formEl.focusStepField.value)

      formEl.focusStepField.value = null
    }
  }
)
</script>

<style src="./RplFormStep.css"></style>
