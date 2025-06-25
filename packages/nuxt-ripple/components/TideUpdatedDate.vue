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
import { format } from 'date-fns'

interface Props {
  date: string
}

const props = withDefaults(defineProps<Props>(), {})

// Wednesday 16 April 2025 at 8:41 am
const formattedDate = computed(() =>
  format(new Date(props.date), "EEEE d MMMM yyyy 'at' K:mm aaa")
)
</script>
