<template>
  <h2 class="rpl-type-h3 docs-h3" :id="id">
    <a v-if="id && generate" :href="`#${id}`">
      <span class="docs-h3--hash">#</span>
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>

<style scoped>
.docs-h3 a {
  text-decoration: none;
  color: var(--rpl-clr-black);
  position: relative;
  &:hover .docs-h3--hash {
    display: block;
  }
}
.docs-h3--hash {
  color: var(--rpl-clr-neutral-200);
  font-size: 0.75em;
  left: -1em;
  position: absolute;
  display: none;
}
</style>
