<script setup lang="ts">
interface Props {
  value: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="rpl-stats-grid-item">
    <dt class="rpl-type-h3">{{ value }}</dt>
    <dd class="rpl-type-p rpl-stats-grid-item__description">
      <slot></slot>
    </dd>
  </div>
</template>
