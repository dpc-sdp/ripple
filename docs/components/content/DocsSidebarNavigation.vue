<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  }
})

const route = useRoute()

function isActive(link) {
  return link.exact
    ? route.path === link._path
    : route.path.startsWith(link._path)
}

const transform = (old) => {
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
</script>

<template>
  <RplVerticalNav :items="transformed" />
</template>
