<script setup lang="ts">
import { nextTick, provide, ref, watch } from 'vue'
import {
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig
} from '@formkit/core'
import { getValidationMessages } from '@formkit/validation'
import rplFormInputs from '../../plugin'
import RplFormAlert from '../RplFormAlert/RplFormAlert.vue'
import { RplContent } from '@dpc-sdp/ripple-ui-core'
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
</script>

<template>
  <FormKit :id="id" v-slot="{ value }" type="form" :plugins="[rplFormInputs]" form-class="rpl-form"
    :config="rplFormConfig" :actions="false" novalidate @submit-invalid="submitInvalidHandler" @submit="submitHandler">
    <fieldset class="rpl-form__submit-guard" :disabled="submissionState.status === 'submitting'">
      <RplFormAlert v-if="errorSummaryMessages && errorSummaryMessages.length" ref="errorSummaryRef" status="error"
        title="Form not submitted" :fields="errorSummaryMessages" data-component-type="form-error-summary" />
      <RplFormAlert v-else-if="
        submissionState.status === 'error' ||
        submissionState.status === 'success'
      " ref="serverMessageRef" :status="submissionState.status" :title="submissionState.title"
        data-component-type="form-server-message">
        <template #default>
          <RplContent :html="submissionState.message" />
        </template>
      </RplFormAlert>
      <slot name="aboveForm"></slot>
      <slot>
        <FormKitSchema v-if="schema" :schema="schema"></FormKitSchema>
      </slot>
      <slot name="belowForm" :value="value"></slot>
    </fieldset>
  </FormKit>
</template>

<style src="./RplForm.css">

</style>
