<template>
  <RplPromoCard :title="title" :url="url">
    <template #default>
      <slot />
    </template>
  </RplPromoCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  url: string
}

defineProps<Props>()
</script>
