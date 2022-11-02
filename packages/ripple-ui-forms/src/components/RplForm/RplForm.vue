<script setup lang="ts">
import { ref } from 'vue'
import { FormKitSchemaCondition, FormKitSchemaNode, FormKitConfig } from '@formkit/core'
import rplFormInputs from '../../plugin'

const submitted = ref(false)

interface Props {
  id: string
  schema?: FormKitSchemaCondition | FormKitSchemaNode[] | undefined
  config?: Record<string, any>
  validationVisibility: string
}


withDefaults(defineProps<Props>(), {
  validationVisibility: 'submit',
  schema: undefined,
  config: (): FormKitConfig => ({
    delimiter: '.',
    messages: {
      en: {
        validation: {
          required({ name }) {
            return `${name} is a required field.`
          }
        }
      }
    },
    rootClasses: function (sectionKey) {
      return {
        [`rpl-form__${sectionKey}`]: true
      }
    }
  })
})

const emit = defineEmits(['submit'])

function submitHandler(form) {
  emit('submit', form)
  submitted.value = true
}

</script>

<template>
  <FormKit :id="id" type="form" :plugins="[rplFormInputs]" form-class="rpl-form" :config="config"
    :validation-visibility="validationVisibility" :actions="false" @submit="submitHandler">
    <slot name="aboveForm">
      <span v-if="submitted">Form Submitted</span>
    </slot>
    <slot>
      <FormKitSchema v-if="schema" :schema="schema"></FormKitSchema>
    </slot>
    <slot name="belowForm"></slot>
  </FormKit>
</template>

<style src="./RplForm.css">

</style>
