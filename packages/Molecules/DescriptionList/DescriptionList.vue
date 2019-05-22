<template>
  <dl class="rpl-description-list" v-if="list && list.length > 0">
    <div class="rpl-description-list__row" v-for="(item, index) in list" :key="index">
      <dt class="rpl-description-list__cell rpl-description-list__term">{{ item.term }}{{ divider }}</dt>
      <dd class="rpl-description-list__cell rpl-description-list__description">{{ item.description }}</dd>
    </div>
  </dl>
</template>

<script>
export default {
  name: 'RplDescriptionList',
  props: {
    list: { type: Array, default: null },
    divider: { type: String, default: ':' }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-description-list-label-ruleset: ('s', 1.5em, 'bold') !default;
  $rpl-description-list-text-color: rpl-color('extra_dark_neutral') !default;

  .rpl-description-list {
    @include rpl_text_color($rpl-description-list-text-color);
    display: table;

    &__row {
      display: table-row;
    }

    &__cell {
      display: table-cell;
    }

    &__term {
      @include rpl_typography_ruleset($rpl-description-list-label-ruleset);
      padding-right: $rpl-space-2;
    }
  }
</style>
