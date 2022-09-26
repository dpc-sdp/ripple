<script lang="ts">
export default { name: 'RplHeader' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  type: undefined
})

const classes = computed(() => ({
  'rpl-header': true,
  [`rpl-header--${props.type}`]: props.type
}))
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.backdrop" class="rpl-header__backdrop">
      <slot name="backdrop"></slot>
    </div>
    <div class="rpl-container">
      <div class="rpl-grid">
        <div class="rpl-col-12 rpl-col-7-m">
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
        <div class="rpl-col-12 rpl-col-4-m">
          <div v-if="$slots.aside" class="rpl-header__aside">
            <slot name="aside"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./header.css" />
