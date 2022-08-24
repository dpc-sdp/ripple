<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>
  <RplForm :schema="schema" @submit="submitHandler" />
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { FormKitSchemaNode } from '@formkit/core'

defineProps({
  title: {
    type: [String, undefined],
    default: undefined
  },
  schema: {
    type: Array as PropType<FormKitSchemaNode[]>,
    required: true
  }
})
const submitHandler = (values) => {
  console.log('Form Submission', values)
}
</script>
