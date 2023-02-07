<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  }
})

console.log(props.links)

const route = useRoute()

function isActive(link) {
  return link.exact
    ? route.path === link._path
    : route.path.startsWith(link._path)
}

const transform = (old) => {
  console.log(old)
  return {
    id: old._path,
    text: old.title,
    url: old._path,
    active: isActive(old),
    items: old.children ? old.children.map(transform) : undefined
  }
}

const transformed = computed(() => {
  return props.links.map(transform)
})

console.log(transformed.value)
</script>

<template>
  <RplVerticalNav :items="transformed" />
</template>
