<script setup lang="ts">
import { RplAcknowledgement } from '@dpc-sdp/ripple-ui-core'
</script>

<template>
  <div
    data-cy="hero-ack"
    class="tide-hero-ack rpl-u-padding-t-4 rpl-u-padding-b-4"
  >
    <div class="rpl-container">
      <RplAcknowledgement />
    </div>
  </div>
</template>

<style>
.tide-hero-ack {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}
</style>
