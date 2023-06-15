<template>
  <p
    class="rpl-type-p-small rpl-u-margin-t-6 rpl-updated-date"
    data-cy="updated-date"
  >
    Updated <time :datetime="date">{{ formattedDate }}</time>
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
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Australia/Melbourne'
  }).format(date)
})
</script>
