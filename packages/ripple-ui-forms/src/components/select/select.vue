<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  context: {
    type: Object,
    required: true
  }
})
const value = ref(props.context.value || '')
const classes = ref(props.context.classes.select || '')
</script>

<template>
  <select
    :id="context.id"
    :disabled="context.disabled"
    v-bind="$attrs"
    :name="context.node.name"
    data-test="true"
    :class="classes"
    :value="value"
    @blur="context.handlers.blur"
  >
    <option v-for="option in context.options" :key="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
