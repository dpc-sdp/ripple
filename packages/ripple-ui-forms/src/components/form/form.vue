<script lang="ts">
export default { name: 'RplForm' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { FormKitSchemaNode } from '@formkit/core'

function rootClasses(sectionKey) {
  return {
    [`rpl-form__${sectionKey}`]: true
  }
}
const formConfig = {
  rootClasses
}
defineProps({
  schema: {
    type: Array as PropType<FormKitSchemaNode[]>,
    required: true
  }
})
</script>

<template>
  <FormKit
    type="form"
    form-class="rpl-form"
    :config="formConfig"
    :actions="false"
  >
    <FormKitSchema v-if="schema" :schema="schema" />
    <slot></slot>
  </FormKit>
</template>

<style src="./form.css" />
