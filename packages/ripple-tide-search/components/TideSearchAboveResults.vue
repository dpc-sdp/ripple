<template>
  <div
    :class="{
      'tide-search-listing-above-result': true,
      'tide-search-listing-above-result--compact': hasSidebar
    }"
  >
    <div class="tide-search-listing-above-result__left">
      <slot name="left">
        <div />
      </slot>
    </div>

    <div class="tide-search-listing-above-result__right">
      <slot name="right">
        <div />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hasSidebar?: boolean
}

withDefaults(defineProps<Props>(), {
  hasSidebar: false
})
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-listing-above-result {
  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
}

.tide-search-listing-above-result__left {
  flex-grow: 1;
}

.tide-search-listing-above-result__right {
  @media (--rpl-bp-m) {
    width: 360px;
  }
}

.tide-search-listing-above-result--compact {
  @media (--rpl-bp-m) {
    flex-direction: column;

    .tide-search-listing-above-result__left,
    .tide-search-listing-above-result__right {
      flex-grow: 1;
      width: 100%;
    }
  }
}
</style>
