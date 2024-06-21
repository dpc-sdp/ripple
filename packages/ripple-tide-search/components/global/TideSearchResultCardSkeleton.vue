<template>
  <div class="tide-search-result-card-skeleton">
    <RplSkeleton width="full" class="rpl-u-aspect-wide" />
    <div class="rpl-u-margin-5">
      <RplSkeleton width="xs" class="rpl-type-label-small" />
      <RplSkeleton width="l" class="rpl-u-margin-t-3 rpl-type-h3-fixed" />
      <RplSkeleton width="full" class="rpl-u-margin-t-3 rpl-type-p" />
      <RplSkeleton width="full" class="rpl-u-margin-t-1 rpl-type-p" />
      <RplSkeleton width="m" class="rpl-u-margin-t-1 rpl-type-p" />
    </div>
  </div>
</template>

<style>
.tide-search-result-card-skeleton {
  width: 100%;
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  border-radius: var(--rpl-border-radius-2);
}
</style>
