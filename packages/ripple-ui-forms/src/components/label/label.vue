<template>
  <label class="rpl-form-label rpl-type-label-small rpl-type-weight-bold">{{
    label
  }}</label>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<style>
.rpl-form-label {
  display: inline-block;
  margin-bottom: var(--rpl-sp-2);
}
</style>
