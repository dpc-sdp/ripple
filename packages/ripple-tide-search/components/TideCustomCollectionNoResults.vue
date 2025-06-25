<template>
  <div
    class="tide-custom-collection-no-results"
    data-component-type="custom-collection-no-results"
  >
    <p class="rpl-type-h4-fixed">Sorry, no results match your search.</p>
    <p class="rpl-type-p-small rpl-u-margin-t-2">
      Try again with different search options or check back later.
    </p>
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-custom-collection-no-results {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  @media (--rpl-bp-m) {
    max-width: 50vw;
  }
}
</style>
