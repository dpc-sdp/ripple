<script setup lang="ts">
import { FormKitSchemaNode } from '@formkit/core'

defineProps<{
  title: string
  schema: Array<FormKitSchemaNode>
}>()

const submitHandler = (values) => {
  console.log('Form Submission', values)
}
</script>

<template>
  <h2 v-if="title" class="rpl-type-h2">{{ title }}</h2>
  <RplForm :schema="schema" @submit="submitHandler" />
</template>
