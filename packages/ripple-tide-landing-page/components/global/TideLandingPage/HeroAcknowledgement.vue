<script setup lang="ts">
import { RplAcknowledgement } from '#components'
defineProps<{
  message: string
}>()
</script>

<template>
  <div
    data-cy="hero-ack"
    class="tide-hero-ack rpl-u-padding-t-4 rpl-u-padding-b-4 rpl-u-screen-only"
  >
    <div class="rpl-container">
      <RplAcknowledgement :message="message" />
    </div>
  </div>
</template>

<style>
.tide-hero-ack {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}
</style>
