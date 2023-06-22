<script setup lang="ts">
interface Props {
  name: string
  size?: 'xs' | 's' | 'm' | 'l'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'xs'
})
</script>

<template>
  <RplIcon :name="name" colour="default" :size="size" />
</template>
