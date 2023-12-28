<template>
  <RplPageComponent>
    <div
      :class="{
        'tide-search-listing-above-result': true,
        'tide-search-listing-above-result--compact': hasSidebar
      }"
    >
      <slot name="left">
        <div />
      </slot>

      <div class="tide-search-listing-above-result__right">
        <slot name="right">
          <div />
        </slot>
      </div>
    </div>
  </RplPageComponent>
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
  @media (--rpl-bp-m) {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
}

.tide-search-listing-above-result__right {
  @media (--rpl-bp-m) {
    width: 360px;
  }
}

.tide-search-listing-above-result.tide-search-listing-above-result--compact {
  @media (--rpl-bp-m) {
    display: block;
  }
}

.tide-search-listing-above-result--compact
  .tide-search-listing-above-result__right {
  @media (--rpl-bp-m) {
    width: auto;
  }
}
</style>
