<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: string
  type: string
  counterMin?: number
  counterMax?: number
  countWords?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'character',
  counterMin: undefined,
  counterMax: undefined,
  countWords: false
})

const pluralize = (count: number) => (count > 1 ? 's' : '')

const counterMessage = computed(() => {
  let value = props.value || ''
  let length = value?.length || 0

  if (value && props.countWords) {
    length = value.trim().split(/\s+/).length
  }
  if (props.counterMin && length < props.counterMin) {
    const count = props.counterMin - length
    return `You have ${count} ${props.type}${pluralize(count)} remaining`
  }
  if (props.counterMax && length > props.counterMax) {
    const count = length - props.counterMax
    return `You have ${count} ${props.type}${pluralize(count)} too many`
  }

  return `You have ${length} ${props.type}${pluralize(length)}`
})
</script>

<template>
  <div
    v-if="counterMin || counterMax"
    class="rpl-form__counter rpl-type-label-small"
    data-cy="counter"
  >
    {{ counterMessage }}
  </div>
</template>

<style src="./RplFormCounter.css"></style>
