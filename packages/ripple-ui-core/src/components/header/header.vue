<script lang="ts">
export default { name: 'RplHeader' }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { RplHeaderThemes } from './constants'

interface Props {
  theme: typeof RplHeaderThemes[number]
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default'
})

const slots = useSlots()

const classes = computed(() => ({
  'rpl-header': true,
  [`rpl-header--${props.theme}`]: props.theme
}))

const mainClasses = computed(() => ({
  'rpl-header__main': true,
  'rpl-col-12': true,
  'rpl-col-7-m': slots.aside,
  'rpl-col-8-m': !slots.aside
}))
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.backdrop" class="rpl-header__backdrop">
      <slot name="backdrop"></slot>
    </div>
    <div v-if="$slots.before" class="rpl-header__before">
      <slot name="before"></slot>
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
          class="rpl-header__aside rpl-col-12 rpl-col-4-m"
        >
          <slot name="aside"></slot>
        </div>
      </div>
    </div>
    <div v-if="$slots.after" class="rpl-header__after">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<style src="./header.css" />
