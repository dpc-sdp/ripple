<script lang="ts">
export default { name: 'RplForm' }
</script>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { FormKitSchemaNode, FormKitConfig } from '@formkit/core'
import rplFormInputs from './../../plugin'

const submitted = ref(false)

interface Props {
  id: string
  schema: FormKitSchemaNode
  config?: Record<string, any>
  validationVisibility: string
}


withDefaults(defineProps<Props>(), {
  validationVisibility: 'submit',
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

function submitHandler(form) {
  console.log(form)
  submitted.value = true
}

</script>

<template>
  <FormKit type="form" :id="id" :plugins="[rplFormInputs]" form-class="rpl-form" :config="config"
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

























































































<style src="./form.css" />
