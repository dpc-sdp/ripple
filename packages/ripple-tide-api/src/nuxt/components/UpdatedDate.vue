<template>
  <p class="rpl-type-p rpl-u-margin-t-6" data-cy="updated-date">
    Last updated: <time :datetime="date">{{ formattedDate }}</time>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  date: string
}

const props = withDefaults(defineProps<Props>(), {})

const formattedDate = computed(() => {
  const date = new Date(props.date)

  return Intl.DateTimeFormat('en-AU', {
    dateStyle: 'full'
  }).format(date)
})
</script>
