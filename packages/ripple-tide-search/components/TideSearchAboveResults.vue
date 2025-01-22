<template>
  <div
    :class="{
      'tide-search-listing-above-result': true,
      'tide-search-listing-above-result--compact': hasSidebar
    }"
  >
    <div class="tide-search-listing-above-result__left">
      <slot name="left" />
    </div>

    <div class="tide-search-listing-above-result__right">
      <slot name="right" />
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
  margin-bottom: var(--rpl-sp-6);

  @media (--rpl-bp-m) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }

  @media (--rpl-bp-xl) {
    margin-bottom: var(--rpl-sp-7);
  }
}

.tide-search-listing-above-result__left {
  flex-grow: 1;
}

.tide-search-listing-above-result__right {
  @media (--rpl-bp-m) {
    width: 360px;
  }

  &:empty {
    display: none;
  }
}

.tide-search-listing-above-result--compact {
  @media (--rpl-bp-m) {
    flex-direction: column;

    .tide-search-listing-above-result__left {
      width: 100%;
    }

    .tide-search-listing-above-result__right {
      align-self: flex-end;
    }
  }
}
</style>
