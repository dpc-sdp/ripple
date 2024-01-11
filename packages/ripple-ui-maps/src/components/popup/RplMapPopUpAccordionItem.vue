<template>
  <div
    :class="{
      'rpl-map-pop-up-accordion-item': true,
      'rpl-map-pop-up-accordion-item--active': isExpanded
    }"
  >
    <button
      type="button"
      class="rpl-map-pop-up-accordion-item__toggle rpl-u-focusable-block"
      :aria-expanded="isExpanded"
      @click="handleToggle"
    >
      <h4 class="rpl-type-p-small">
        {{ feature.title[0] }}
      </h4>

      <!-- Icon -->
      <span
        class="rpl-map-pop-up-accordion-item__chevron rpl-u-screen-only"
        aria-hidden="true"
      >
        <RplIcon name="icon-chevron-down" size="xs"></RplIcon>
      </span>
    </button>
    <RplExpandable :expanded="isExpanded">
      <div class="rpl-u-margin-b-3">
        <slot></slot>
      </div>
    </RplExpandable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RplExpandable, RplIcon } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  feature: any
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), { defaultExpanded: false })

const isExpanded = ref(false)

const handleToggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>
<style src="./RplMapPopUp.css" />
