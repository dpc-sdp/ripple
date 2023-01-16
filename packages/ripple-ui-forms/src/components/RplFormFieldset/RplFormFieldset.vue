<script setup lang="ts">
interface Props {
  legend?: string
}

withDefaults(defineProps<Props>(), {
  legend: ''
})
</script>

<template>
  <fieldset class="rpl-form-fieldset">
    <legend v-if="legend" class="rpl-type-label-large">{{ legend }}</legend>
    <slot />
  </fieldset>
</template>

<style src="./RplFormFieldset.css"></style>
