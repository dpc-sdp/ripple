<template>
  <p class="rpl-type-p">{{ feature.description }}</p>
</template>

<script setup lang="ts">
interface Props {
  feature: any
}
withDefaults(defineProps<Props>(), {})
</script>
