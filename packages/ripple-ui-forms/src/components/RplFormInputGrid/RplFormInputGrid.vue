<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  columnClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  columnClasses: ''
})

const gridClasses = computed(() => (props.columnClasses ? 'rpl-grid' : ''))
</script>

<template>
  <div :class="gridClasses">
    <div :class="columnClasses"><slot /></div>
  </div>
</template>
