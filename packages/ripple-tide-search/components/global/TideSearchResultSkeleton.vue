<template>
  <div class="tide-search-result-skeleton">
    <RplSkeleton width="s" class="rpl-type-h3" />
    <RplSkeleton width="m" class="rpl-u-margin-t-1 rpl-type-p-small" />
    <RplSkeleton width="full" class="rpl-u-margin-t-2 rpl-type-p" />
    <RplSkeleton width="full" class="rpl-u-margin-t-1 rpl-type-p" />
    <RplSkeleton width="xs" class="rpl-u-margin-t-3 rpl-type-p-small" />
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-result-skeleton {
  padding-block: var(--rpl-sp-5);

  @media (--rpl-bp-l) {
    padding-block: var(--rpl-sp-7);
  }
}
</style>
