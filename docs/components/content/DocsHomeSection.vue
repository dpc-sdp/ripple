<script lang="ts" setup>
export interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<template>
  <div class="docs-home-section">
    <h2
      v-if="title"
      class="docs-home-section-title rpl-type-h2 rpl-u-margin-b-2"
      data-cy="page-component-title"
    >
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-home-section {
  margin-bottom: var(--rpl-sp-7);

  @media (--rpl-bp-m) {
    margin-bottom: var(--rpl-sp-9);
  }
}

.docs-home-section:last-child {
  margin-bottom: 0;
}

.docs-home-section-title {
  margin-bottom: var(--rpl-sp-6);
}
</style>
