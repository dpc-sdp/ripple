<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: string
  type: string
  invalid: boolean
  counterMin?: number
  counterMax?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'character',
  value: '',
  counterMin: undefined,
  counterMax: undefined
})

const pluralize = (count: number) => (!count || count > 1 ? 's' : '')

const counterMessage = computed(() => {
  let value = props.value
  let length = value?.length || 0

  if (value && props.type === 'word') {
    length = value.trim().split(/\s+/).length
  }

  if (props.invalid && props.counterMin && length < props.counterMin) {
    return `You have ${props.counterMin - length} ${props.type}${pluralize(
      props.counterMin - length
    )} too little`
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
