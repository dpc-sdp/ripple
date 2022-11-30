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
    @submit="submitHandler"
  >
    <slot name="aboveForm">
      <span v-if="submitted">Form Submitted</span>
    </slot>
    <slot>
      <FormKitSchema v-if="schema" :schema="schema"></FormKitSchema>
    </slot>
    <slot name="belowForm" :value="value"></slot>
  </FormKit>
</template>

<style src="./RplForm.css"></style>
