<template>
  <DevOnly>
    <div class="rpl-callout callout-error">
      <h3>Data driven component {{ component }} not found</h3>
      <p>Check the component mapping for {{ field }} in app.config</p>
    </div>
  </DevOnly>
</template>

<script setup lang="ts">
interface Props {
  component: string
  field: string
}

defineProps<Props>()
</script>

<style>
.callout-error {
  --rpl-clr-accent: var(--rpl-clr-error);
  --rpl-clr-accent-alt: var(--rpl-clr-error-light);
}
</style>
