<script setup lang="ts">
import { nextTick, provide, ref, watch, reactive, computed } from 'vue'
import {
  getNode,
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig,
  FormKitNode,
  FormKitPlugin
} from '@formkit/core'
import { getValidationMessages } from '@formkit/validation'
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
}

interface CachedError {
  fieldId: string
  text: string
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
  customInputs: () => {}
})

const emit = defineEmits<{
  (e: 'submit', payload: rplEventPayload & { action: 'submit' }): void
  (e: 'invalid', payload: rplEventPayload & { action: 'submit' }): void
  (e: 'submitted', payload: rplEventPayload & { action: 'complete' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form', emit)

const isFormSubmitting = computed(() => {
  return props.submissionState.status === 'submitting'
})

const serverMessageRef = ref(null)

const errorSummaryRef = ref(null)
const cachedErrors = ref<Record<string, CachedError>>({})
const submitCounter = ref(0)

provide('form', { id: props.id, name: props.title })
provide('isFormSubmitting', isFormSubmitting)
// submitCounter is watched by some components to efficiently know when to update
provide('submitCounter', submitCounter)

const submitLabel =
  props.schema?.find((field) => field?.key === 'actions')?.label || 'Submit'

const submitHandler = (form, node: FormKitNode) => {
  // Reset the error summary as it is not reactive
  cachedErrors.value = {}
  submitCounter.value = 0

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
  submitCounter.value = submitCounter.value + 1

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

  cachedErrors.value = cachedErrorsMap

  emitRplEvent(
    'invalid',
    {
      id: props.id,
      action: 'submit',
      name: props.title,
      text: submitLabel,
      value: sanitisePIIFields(node)
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
            value: sanitisePIIFields(getNode(props.id))
          },
          { global: true }
        )

        reset(props.id)
      }
    }
  }
)

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
    [rplFormInputs, props.customInputs ? props.customInputs : false].filter(
      Boolean
    ) as FormKitPlugin[]
)
</script>

<template>
  <FormKit
    :id="id"
    v-slot="{ value }"
    :name="id"
    type="form"
    :plugins="plugins"
    form-class="rpl-form"
    :config="rplFormConfig"
    :actions="false"
    :inputErrors="inputErrors"
    novalidate
    @submit-invalid="submitInvalidHandler"
    @submit="submitHandler"
  >
    <fieldset
      class="rpl-form__submit-guard"
      :disabled="submissionState.status === 'submitting'"
    >
      <RplFormAlert
        v-if="errorSummaryMessages && errorSummaryMessages.length"
        ref="errorSummaryRef"
        status="error"
        title="Form not submitted"
        :fields="errorSummaryMessages"
        data-component-type="form-error-summary"
      />
      <RplFormAlert
        v-else-if="
          submissionState.status === 'error' ||
          submissionState.status === 'success'
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
        <FormKitSchema
          v-if="schema"
          :schema="schema"
          :data="data"
        ></FormKitSchema>
      </slot>
      <slot name="belowForm" :value="value"></slot>
    </fieldset>
  </FormKit>
</template>

<style src="./RplForm.css"></style>
