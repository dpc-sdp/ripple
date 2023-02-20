<script setup lang="ts">
interface Props {
  value: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <li class="rpl-stats-grid-item">
    <div class="rpl-stats-grid-item__inner">
      <span class="rpl-type-h3">{{ value }}</span>
      <span class="rpl-type-p">
        <slot></slot>
      </span>
    </div>
  </li>
</template>
