<script setup lang="ts">
interface Props {
  name: string
  size?: 'xs' | 's' | 'm' | 'l'
}

withDefaults(defineProps<Props>(), {
  size: 'xs'
})
</script>

<template>
  <RplIcon :name="name" colour="default" :size="size" />
</template>
