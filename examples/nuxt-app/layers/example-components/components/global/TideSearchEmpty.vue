<template>
  <RplContent data-component-type="search-listing-no-results">
    <slot>
      <p class="rpl-type-h3 rpl-u-margin-b-6">
        This is a custom component, you can do or say whatever you want here,
        e.g.
      </p>
      <RplButton>Here is a button</RplButton>
    </slot>
  </RplContent>
</template>

<script setup lang="ts">
interface Props {
  query?: string | undefined
}

withDefaults(defineProps<Props>(), {
  query: undefined
})
</script>
