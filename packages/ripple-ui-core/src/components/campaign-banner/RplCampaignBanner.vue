<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  type: 'primary' | 'secondary'
}

const props = defineProps<Props>()

const slots = useSlots()

const isPrimary = computed(() => props.type === 'primary')

const classes = computed(() => ({
  'rpl-campaign-banner': true,
  [`rpl-campaign-banner--${props.type}`]: true,
  'rpl-campaign-banner--media': slots.media,
  'rpl-campaign-banner--meta': slots.meta
}))

const mediaClasses = computed(() => ({
  'rpl-campaign-banner__media': true,
  'rpl-col-12': true,
  'rpl-col-6-m': isPrimary.value,
  'rpl-col-4-l': !isPrimary.value
}))

const bodyClasses = computed(() => ({
  'rpl-campaign-banner__body': true,
  'rpl-col-12': true,
  'rpl-col-6-m': isPrimary.value && slots.media,
  'rpl-col-7-m': isPrimary.value && !slots.media,
  'rpl-col-7-l': !isPrimary.value
}))
</script>

<template>
  <div :class="classes">
    <div class="rpl-container">
      <div class="rpl-campaign-banner__inner rpl-grid">
        <div v-if="$slots.media" :class="mediaClasses">
          <slot name="media"></slot>
        </div>
        <div :class="bodyClasses">
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

<style src="./RplCampaignBanner.css" />
