<script setup lang="ts">
interface Props {
  html: string
}

defineProps<Props>()
</script>
<template>
  <div class="rpl-form__outer">
    <RplContent :html="html" />
  </div>
</template>
