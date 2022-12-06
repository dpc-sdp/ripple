<script setup lang="ts">
import { ref } from 'vue'
import {
  FormKitSchemaCondition,
  FormKitSchemaNode,
  FormKitConfig
} from '@formkit/core'
import rplFormInputs from '../../plugin'

const submitted = ref(false)

interface Props {
  id: string
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  config?: Record<string, any>
  submissionState: {
    status: 'idle' | 'submitting' | 'success' | 'failure'
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
    message: ''
  })
})

const emit = defineEmits(['submit'])

function submitHandler(form) {
  emit('submit', form)
  submitted.value = true
}

const rplFormConfig = ref({
  rootClasses: function (sectionKey) {
    return {
      [`rpl-form__${sectionKey}`]: true
    }
  },
  ...props.config
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
    @submit="submitHandler"
  >
    <fieldset
      class="rpl-form__submit-guard"
      :disabled="submissionState.status === 'submitting'"
    >
      <slot name="aboveForm">
        <div>
          <div>
            {{ submissionState.status }}
          </div>
          <div>
            {{ submissionState.message }}
          </div>
        </div>
      </slot>
      <slot>
        <FormKitSchema v-if="schema" :schema="schema"></FormKitSchema>
      </slot>
      <slot name="belowForm" :value="value"></slot>
    </fieldset>
  </FormKit>
</template>

<style src="./RplForm.css"></style>
