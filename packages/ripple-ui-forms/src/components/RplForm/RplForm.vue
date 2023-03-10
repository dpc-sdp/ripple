<script setup lang="ts">
import { nextTick, provide, ref, watch, reactive, computed } from 'vue'
import {
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig
} from '@formkit/core'
import { getValidationMessages } from '@formkit/validation'
import rplFormInputs from '../../plugin'
import RplFormAlert from '../RplFormAlert/RplFormAlert.vue'
import { RplContent } from '@dpc-sdp/ripple-ui-core/vue'
import { reset } from '@formkit/vue'

interface Props {
  id: string
  resetOnSubmit?: boolean
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  config?: Record<string, any>
  submissionState?: {
    status: 'idle' | 'submitting' | 'success' | 'error'
    title: string
    message: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  resetOnSubmit: false,
  schema: undefined,
  config: (): Partial<Omit<FormKitConfig, 'rootClasses' | 'delimiter'>> => ({
    validationVisibility: 'submit',
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
  })
})

const emit = defineEmits(['submit'])

provide('formId', props.id)

const isFormSubmitting = computed(() => {
  return props.submissionState.status === 'submitting'
})
provide('isFormSubmitting', isFormSubmitting)

const serverMessageRef = ref(null)

const errorSummaryRef = ref(null)
const errorSummaryMessages = ref([])

const submitHandler = (form) => {
  // Reset the error summary as it is not reactive
  errorSummaryMessages.value = []

  emit('submit', form)
}

const submitInvalidHandler = async (node) => {
  const validations = getValidationMessages(node)

  const fieldMessages = []

  // Note: validations is a JS Map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  validations.forEach((inputMessages, fieldNode) => {
    const fieldId = fieldNode.context.id

    fieldMessages.push({
      fieldId: fieldId,
      text: inputMessages.map((message) => message.value)[0]
    })
  })

  errorSummaryMessages.value = fieldMessages

  await nextTick()
  if (errorSummaryRef.value) {
    errorSummaryRef.value.focus()
  }
}

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
  isChecked: (val) => !!val,
  negate: (val) => !val,
  isEqual: (targetValue, triggerValue) => {
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
</script>

<template>
  <FormKit
    :id="id"
    v-slot="{ value }"
    type="form"
    :plugins="[rplFormInputs]"
    form-class="rpl-form"
    :config="rplFormConfig"
    :actions="false"
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
