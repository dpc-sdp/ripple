<template>
  <RplSkeleton
    width="full"
    effect="fade"
    class="tide-search-listing-results-map-skeleton rpl-u-aspect-wide"
  >
    <RplIcon name="icon-pin" size="l" />
  </RplSkeleton>
</template>

<style>
.tide-search-listing-results-map-skeleton {
  display: flex;
  justify-content: center;
  align-items: center;

  .rpl-icon {
    --rpl-icon-size: var(--rpl-type-size-8);

    opacity: 0.1;
    color: var(--rpl-clr-dark);
    box-shadow: 0 var(--rpl-sp-3) 0 calc(var(--rpl-sp-2) * -1) currentColor;
  }

  svg {
    animation: map-skeleton-pin var(--local-animation-duration) infinite
      ease-in-out;
  }
}

@keyframes map-skeleton-pin {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(calc(var(--rpl-sp-3) * -1)) scale(1.05);
  }
  60% {
    transform: translateY(calc(var(--rpl-sp-2) * -1));
  }
}
</style>
