<script setup lang="ts">
interface Props {
  src: string
}
defineProps<Props>()
</script>

<template>
  <img :src="src" :aspect="null" :rendered="null" />
</template>
