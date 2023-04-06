<script setup lang="ts">
interface Props {
  src: string
}
defineProps<Props>()
</script>

<template>
  <img :src="src" />
</template>
