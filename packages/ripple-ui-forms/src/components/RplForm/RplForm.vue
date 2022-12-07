<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import {
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig
} from '@formkit/core'
import rplFormInputs from '../../plugin'
import RplFormAlert from '../RplFormAlert/RplFormAlert.vue'
import { RplContent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  config?: Record<string, any>
  submissionState: {
    status: 'idle' | 'submitting' | 'success' | 'error'
    title: string
    message: string
  }
}

const props = withDefaults(defineProps<Props>(), {
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

const serverSuccessRef = ref(null)
const serverErrorRef = ref(null)

const submitHandler = (form) => {
  emit('submit', form)
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
    if (oldStatus === 'submitting' && newStatus === 'success') {
      await nextTick()
      if (serverSuccessRef.value) {
        serverSuccessRef.value.focus()
      }
    } else if (oldStatus === 'submitting' && newStatus === 'error') {
      await nextTick()
      if (serverErrorRef.value) {
        serverErrorRef.value.focus()
      }
    }
  }
)
</script>

<template>
  <RplFormAlert
    v-if="submissionState.status === 'success'"
    ref="serverSuccessRef"
    :status="submissionState.status"
    :title="submissionState.title"
  >
    <template #default>
      <RplContent :html="submissionState.message" />
    </template>
  </RplFormAlert>
  <FormKit
    v-else
    :id="id"
    v-slot="{ value }"
    type="form"
    :plugins="[rplFormInputs]"
    form-class="rpl-form"
    :config="rplFormConfig"
    :actions="false"
    novalidate
    @submit="submitHandler"
  >
    <fieldset
      class="rpl-form__submit-guard"
      :disabled="submissionState.status === 'submitting'"
    >
      <slot name="aboveForm">
        <RplFormAlert
          v-if="submissionState.status === 'error'"
          ref="serverErrorRef"
          :status="submissionState.status"
          :title="submissionState.title"
        >
          <template #default>
            <RplContent :html="submissionState.message" />
          </template>
        </RplFormAlert>
      </slot>
      <slot>
        <FormKitSchema v-if="schema" :schema="schema"></FormKitSchema>
      </slot>
      <slot name="belowForm" :value="value"></slot>
    </fieldset>
  </FormKit>
</template>

<style src="./RplForm.css"></style>
