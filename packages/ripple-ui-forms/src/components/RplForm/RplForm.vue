<script setup lang="ts">
import {
  nextTick,
  provide,
  ref,
  watch,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'
import {
  getNode,
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig,
  FormKitNode,
  FormKitPlugin
} from '@formkit/core'
import { getValidationMessages } from '@formkit/validation'
import { createMultiStepPlugin } from '@formkit/addons'
import rplFormInputs from '../../plugin'
import RplFormAlert from '../RplFormAlert/RplFormAlert.vue'
import { reset } from '@formkit/vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIFields } from '../../lib/sanitisePII'

interface Props {
  id: string
  title?: string
  resetOnSubmit?: boolean
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  config?: Record<string, any>
  submissionState?: {
    status: 'idle' | 'submitting' | 'success' | 'error'
    title: string
    message: string
  }
  customInputs?: FormKitPlugin
  layout?: 'default' | 'compact'
}

interface CachedError {
  fieldId: string
  text: string
}

interface StepFormData {
  [key: string]: {
    [key: string]: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  resetOnSubmit: false,
  schema: undefined,
  config: (): Partial<Omit<FormKitConfig, 'rootClasses' | 'delimiter'>> => ({
    validationVisibility: null, // We add our own custom behavior for this, so set to null
    messages: {
      en: {
        validation: {
          required({ name }) {
            return `${name} is a required field.`
          }
        }
      }
    }
  }),
  submissionState: () => ({
    status: 'idle',
    title: '',
    message: ''
  }),
  customInputs: () => {},
  layout: 'default'
})

const emit = defineEmits<{
  (e: 'submit', payload: rplEventPayload & { action: 'submit' }): void
  (e: 'invalid', payload: rplEventPayload & { action: 'submit' }): void
  (e: 'submitted', payload: rplEventPayload & { action: 'complete' }): void
  (e: 'start', payload: rplEventPayload): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form', emit)

const isFormSubmitting = computed(() => {
  return props.submissionState.status === 'submitting'
})

const stepsRef = ref(null)
const serverMessageRef = ref(null)
const errorSummaryRef = ref(null)
const cachedErrors = ref<Record<string, CachedError>>({})
const submitCounter = ref(0)

const stepsId = `${props.id}-steps`

const formSteps = computed(() => {
  if (!props.schema || !Array.isArray(props.schema)) return []

  return props.schema.filter((i) => i['$step'])
})

const getFormNode = (node?: FormKitNode) => {
  return formSteps.value.length ? getNode(stepsId) : node || getNode(props.id)
}

// Keep track of whether user has changed something in the form
const formStarted = ref<boolean>(false)

const tryAbandonForm = () => {
  if (formStarted.value && props.submissionState.status !== 'success') {
    emitRplEvent(
      'abandon',
      {
        id: props.id,
        name: props.title,
        value: sanitisePIIFields(getFormNode())
      },
      { global: true }
    )
  }

  formStarted.value = false
}

const onFormReset = () => {
  cachedErrors.value = {}
  submitCounter.value = 0

  tryAbandonForm()
}

provide('form', { id: props.id, name: props.title })
provide('isFormSubmitting', isFormSubmitting)
// submitCounter is watched by some components to efficiently know when to update
provide('submitCounter', submitCounter)
provide('onFormReset', onFormReset)

const submitLabel =
  props.schema?.find((field) => field?.key === 'actions')?.label || 'Submit'

const getErrorMessages = (node: FormKitNode) => {
  const validations = getValidationMessages(node)

  const cachedErrorsMap = {}

  // Note: validations is a JS Map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  validations.forEach((inputMessages, fieldNode) => {
    const fieldId = fieldNode.context.id

    cachedErrorsMap[fieldNode.name] = inputMessages.map((message) => ({
      fieldId,
      text: message.value
    }))[0]
  })

  return cachedErrorsMap
}

const submitHandler = (form, node: FormKitNode) => {
  // Reset the error summary as it is not reactive
  cachedErrors.value = {}
  submitCounter.value = 0

  // Steps are nested so we need to flatten them data before submission
  if (formSteps.value.length) {
    const formSteps: StepFormData = form?.[stepsId] || {}

    form = Object.values(formSteps).reduce(
      (acc, step) => ({ ...acc, ...step }),
      {}
    )

    node = getNode(stepsId)
  }

  emitRplEvent(
    'submit',
    {
      data: form,
      id: props.id,
      name: props.title,
      action: 'submit',
      text: submitLabel,
      value: sanitisePIIFields(node)
    },
    { global: true }
  )
}

const submitInvalidHandler = async (node: FormKitNode) => {
  // If a user hits enter within a form field in a multistep form
  // we check if in there's a next step and if so navigate to that instead of submitting
  if (formSteps.value.length) {
    const activeStep = getNode(stepsId)?.context?.steps?.find(
      (s) => s?.isActiveStep
    )

    if (!activeStep?.isLastStep) {
      return getNode(stepsId)?.next()
    }
  }

  submitCounter.value = submitCounter.value + 1

  cachedErrors.value = getErrorMessages(node)

  emitRplEvent(
    'invalid',
    {
      id: props.id,
      action: 'submit',
      name: props.title,
      text: submitLabel,
      value: sanitisePIIFields(getFormNode(node))
    },
    { global: true }
  )

  await nextTick()
  if (errorSummaryRef.value) {
    errorSummaryRef.value.focus()
  }
}

const inputErrors = computed(() => {
  return Object.entries(cachedErrors.value).reduce((result, [key, value]) => {
    return {
      ...result,
      [key]: value.text
    }
  }, {})
})

// inputErrors only updates on submit
provide('inputErrors', inputErrors)

const errorSummaryMessages = computed(() => {
  return Object.values(cachedErrors.value)
})

const rplFormConfig = ref({
  rootClasses: function (sectionKey) {
    return {
      [`rpl-form__${sectionKey}`]: true
    }
  },
  ...props.config
})

// Scroll to and focus on success and error messages when they appear
watch(
  () => props.submissionState.status,
  async (newStatus, oldStatus) => {
    if (
      (oldStatus === 'submitting' && newStatus === 'success') ||
      (oldStatus === 'submitting' && newStatus === 'error')
    ) {
      await nextTick()
      if (serverMessageRef.value) {
        serverMessageRef.value.focus()
      }

      if (newStatus === 'success') {
        emitRplEvent(
          'submitted',
          {
            id: props.id,
            action: 'complete',
            name: props.title,
            text: submitLabel,
            value: sanitisePIIFields(getFormNode())
          },
          { global: true }
        )

        formStarted.value = false

        reset(props.id)

        if (formSteps.value.length) {
          getNode(stepsId)?.goTo(formSteps.value[0]?.id)
        }
      }
    }
  }
)

const handleInput = () => {
  // 'Form start' analytics event, fires on first change of the form
  if (!formStarted.value) {
    formStarted.value = true

    emitRplEvent(
      'start',
      {
        id: props.id,
        name: props.title
      },
      { global: true }
    )
  }
}

const handleStepChange = async ({ currentStep, delta }) => {
  const forwards = delta > 0
  let isStepValid = currentStep.isValid

  cachedErrors.value = {}

  // Going backwards is always allowed
  if (!forwards) {
    isStepValid = true
  }

  // Always focus the next step and increment the counter
  // except after submission, then the alert is focused instead
  if (submitCounter.value !== 0 || forwards) {
    await nextTick()
    if (stepsRef.value) {
      stepsRef.value.focus()
    }
    submitCounter.value = submitCounter.value + 1
  }

  // Get the current steps errors when it's invalid, and we're trying to proceed
  if (!currentStep.isValid && forwards) {
    cachedErrors.value = getErrorMessages(getNode(currentStep.id))
  }

  return isStepValid
}

onBeforeUnmount(() => {
  tryAbandonForm()
})

const data = reactive({
  isFilled: (val) =>
    typeof val === 'number'
      ? !isNaN(val)
      : !(val === undefined || val === null || val === ''),
  isChecked: (targetValue, triggerValue) => {
    if (Array.isArray(targetValue)) {
      return targetValue.includes(triggerValue)
    }
    return !!targetValue
  },
  negate: (val) => !val,
  isEqual: (targetValue, triggerValue) => {
    if (Array.isArray(targetValue)) {
      return targetValue.includes(triggerValue)
    }
    if (typeof targetValue === 'number') {
      return targetValue === parseFloat(triggerValue)
    }

    return targetValue === triggerValue
  },
  xor: (...args: boolean[]) => {
    return (args || []).filter((arg) => arg === true).length === 1
  },
  difference: (targetValue, triggerValue) => {
    const intTargetValue = parseFloat(targetValue)
    const intTriggerValue = parseFloat(triggerValue)
    return intTargetValue - intTriggerValue
  },
  isPatternMatch: (val, pattern) => {
    const matches = val ? `${val}`.match(new RegExp(pattern)) : null
    return matches && matches.length > 0
  }
})

const plugins = computed(
  () =>
    [
      rplFormInputs,
      createMultiStepPlugin(),
      props.customInputs ? props.customInputs : false
    ].filter(Boolean) as FormKitPlugin[]
)

const formClasses = computed(() => {
  return {
    'rpl-form': true,
    [`rpl-form--${props.layout}`]: true,
    'rpl-form--multi-step': formSteps.value.length
  }
})
</script>

<template>
  <FormKit
    :id="id"
    v-slot="{ value }"
    :name="id"
    type="form"
    :plugins="plugins"
    :form-class="formClasses"
    :config="rplFormConfig"
    :actions="false"
    :inputErrors="inputErrors"
    :disabled="isFormSubmitting"
    novalidate
    @submit-invalid="submitInvalidHandler"
    @submit="submitHandler"
    @input="handleInput"
  >
    <RplFormAlert
      v-if="
        errorSummaryMessages && errorSummaryMessages.length && !formSteps.length
      "
      ref="errorSummaryRef"
      status="error"
      title="Form not submitted"
      :fields="errorSummaryMessages"
      data-component-type="form-error-summary"
    />
    <RplFormAlert
      v-else-if="
        (submissionState.status === 'error' ||
          submissionState.status === 'success') &&
        submitCounter === 0
      "
      ref="serverMessageRef"
      :status="submissionState.status"
      :title="submissionState.title"
      data-component-type="form-server-message"
    >
      <template #default>
        <RplContent :html="submissionState.message" />
      </template>
    </RplFormAlert>
    <slot name="aboveForm"></slot>
    <slot :value="value">
      <RplFormSteps
        v-if="formSteps.length"
        :id="stepsId"
        ref="stepsRef"
        :data="data"
        :schema="formSteps"
        :errors="errorSummaryMessages"
        :disabled="isFormSubmitting"
        :handle-step-change="handleStepChange"
        :layout="layout"
      />
      <FormKitSchema v-else-if="schema" :schema="schema" :data="data" />
    </slot>
    <slot name="belowForm" :value="value"></slot>
  </FormKit>
</template>

<style src="./RplForm.css"></style>
