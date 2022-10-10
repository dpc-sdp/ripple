<script lang="ts">
export default { name: 'RplCampaignBanner' }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const classes = computed(() => ({
  'rpl-campaign-banner': true,
  [`rpl-campaign-banner--media`]: slots.media,
  [`rpl-campaign-banner--meta`]: slots.meta
}))
</script>

<template>
  <div :class="classes">
    <div class="rpl-container">
      <div class="rpl-campaign-banner__inner">
        <div v-if="$slots.media" class="rpl-campaign-banner__media">
          <slot name="media"></slot>
        </div>
        <div class="rpl-campaign-banner__body">
          <slot name="title"></slot>
          <div class="rpl-campaign-banner__content">
            <slot></slot>
            <div v-if="$slots.action" class="rpl-campaign-banner__action">
              <slot name="action"></slot>
            </div>
          </div>
          <div
            v-if="$slots.meta"
            class="rpl-campaign-banner__meta rpl-type-label-small"
          >
            <slot name="meta"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./campaign-banner.css" />
