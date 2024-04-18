<template>
  <h2 class="rpl-type-h2 docs-h2" :id="id">
    <a v-if="id && generate" :href="`#${id}`">
      <span class="docs-h2--hash">#</span>
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
.docs-h2 a {
  text-decoration: none;
  color: var(--rpl-clr-black);
  position: relative;
  &:hover .docs-h2--hash {
    display: block;
  }
}
.docs-h2--hash {
  color: var(--rpl-clr-neutral-200);
  font-size: 0.75em;
  left: -1em;
  position: absolute;
  display: none;
}
</style>
