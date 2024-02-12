<template>
  <div class="tide-extra-component-example">
    <strong>{{ label }}: </strong>
    <RplTag
      v-if="item?.field_fv_recommendation_number"
      :label="item.field_fv_recommendation_number[0]"
    />
    <p v-if="item?.fv_recommendation_status">
      {{ ` ${item.fv_recommendation_status[0]}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: any
  label: string
}

defineProps<Props>()
</script>

<style>
.tide-extra-component-example {
  display: flex;
  gap: var(--rpl-sp-2);
  align-items: center;
  padding: var(--rpl-sp-5);
}
</style>
