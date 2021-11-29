<template>
  <div class="rpl-search-results-loading">
    <div class="rpl-search-results-loading__top">
      <div class="animated-background rpl-search-results-loading__count"></div>
      <div class="animated-background rpl-search-results-loading__sort"></div>
    </div>
    <div class="animated-background rpl-search-results-loading__table-header"></div>
    <div class="animated-background rpl-search-results-loading__table"></div>
  </div>
</template>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

$rpl-search-results-loading-bg-color: rpl-color('light_neutral');
.rpl-search-results-loading {
  &__top {
    display: flex;
    flex-direction: row;
    margin-top: $rpl-space-4 + $rpl-space-2;
    margin-bottom: $rpl-space-4;
    align-items: center;
  }
  &__count,
  &__sort,
  &__table,
  &__table-header {
    background-color: $rpl-search-results-loading-bg-color;
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #F6F6F6;
    background: linear-gradient(270deg, rpl-color('light_neutral') 8%, #F0F0F0 18%, rpl-color('light_neutral') 33%);
    background-size: 800px 104px;
    height: 96px;
    position: relative;
  }
  &__count {
    height: 24px;
    width: 260px;
  }
  &__sort {
    margin-left: auto;
    height: 48px;
    width: 280px;
  }
  &__table-header {
    height: 30px;
    width: 100%;
    margin-top: $rpl-space-4 + $rpl-space-2;
    margin-bottom: $rpl-space;
  }
  &__table {
    height: 800px;
    width: 100%;
    margin-top: $rpl-space-4;
  }
}
</style>
