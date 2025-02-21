<template>
  <FormKit type="step" :name="name" :label="title" :input-errors="inputErrors">
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
    <h3 class="rpl-form__step-title rpl-type-h2 rpl-u-margin-b-4">
      {{ title }}
    </h3>

    <RplFormAlert
      v-if="errors.length"
      ref="stepErrorsRef"
      status="error"
      title="Step not completed"
      :fields="errors"
      data-component-type="form-error-summary"
    />

    <FormKitSchema v-if="schema" :schema="schema" :data="data" />

    <template #stepPrevious></template>
    <template #stepNext="{ handlers, node }">
      <RplButton
        v-if="!node.context.isLastStep"
        class="rpl-form__step-next rpl-u-margin-t-6"
        variant="filled"
        @click="handlers.next"
      >
        {{ nextButton }}
      </RplButton>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
import { inject, nextTick, Ref, ref, watch } from 'vue'
import {
  FormKitSchemaCondition,
  FormKitSchemaNode,
  getNode
} from '@formkit/core'

interface Props {
  form: string
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
  nextButton: 'Next',
  prevButton: 'Back',
  data: () => ({}),
  errors: () => []
})

const stepErrorsRef = ref(null)
const inputErrors: Ref<Record<string, string>> = inject('inputErrors')

const handleBack = () => getNode(props.form)?.previous()

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
</script>

<style src="./RplFormStep.css"></style>
