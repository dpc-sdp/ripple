<template>
  <li class="rpl-list-group-item">
    <h2 v-if="heading" class="rpl-list-group-item__heading">{{ heading }}</h2>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'RplListGroupItem',
  props: {
    heading: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-list-group-item: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-list-group-item-heading-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-list-group-item-heading-color: rpl-color('extra_dark_neutral') !default;

  .rpl-list-group-item {
    border-top: $rpl-list-group-item;
    padding: ($rpl-space * 6) $rpl-space-4 ($rpl-space * 6) $rpl-space-4;

    @include rpl-breakpoint('l') {
      padding: $rpl-space * 7;
    }

    &:first-child {
      border-top: 0;
    }

    &__heading {
      @include rpl_typography_ruleset($rpl-list-group-item-heading-ruleset);
      color: $rpl-list-group-item-heading-color;
      margin: 0;
      margin-bottom: ($rpl-space * 6)
    }
  }
</style>
