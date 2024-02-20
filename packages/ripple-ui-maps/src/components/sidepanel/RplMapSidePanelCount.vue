<template>
  <div class="rpl-map-side-panel__count">
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <p class="rpl-type-label">
        Displaying {{ pagingStart }}-{{ pagingEnd }} of
        {{ totalResults }} results
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pagingStart: number
  pagingEnd: number
  totalResults: number
}

defineProps<Props>()
</script>
