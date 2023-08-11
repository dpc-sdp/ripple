<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: false
})

const slots = useSlots()

const mainClasses = computed(() => ({
  'rpl-header__main': true,
  'rpl-col-12': true,
  'rpl-col-7-m': !props.fullWidth && slots.aside,
  'rpl-col-10-m': !props.fullWidth && !slots.aside
}))
</script>

<template>
  <div class="rpl-header">
    <div v-if="$slots.behind" class="rpl-header__behind rpl-u-screen-only">
      <slot name="behind"></slot>
    </div>
    <div class="rpl-container">
      <div class="rpl-grid">
        <div :class="mainClasses">
          <div v-if="$slots.upper" class="rpl-header__upper">
            <slot name="upper"></slot>
          </div>
          <div class="rpl-header__body">
            <slot name="title"></slot>
            <div class="rpl-header__content">
              <slot></slot>
            </div>
          </div>
          <div v-if="$slots.lower" class="rpl-header__lower">
            <slot name="lower"></slot>
          </div>
        </div>
        <div
          v-if="$slots.aside"
          class="rpl-header__aside rpl-col-12 rpl-col-4-m rpl-col-start-9-m"
        >
          <slot name="aside"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./RplHeader.css" />
