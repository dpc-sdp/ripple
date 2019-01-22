<template>
  <rpl-markup :plugins="this.schema.plugins" :html="markup" />
</template>

<script>
import { abstractField } from 'vue-form-generator'
import RplMarkup from '@dpc-sdp/ripple-markup'
export default {
  mixins: [abstractField],
  components: {RplMarkup},
  computed: {
    markup () {
      return this.schema.markup
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$tide-link-color: rpl-color('primary') !default;

.rpl-markup {
  @include rpl_typography;

  // The below should be cleaned up. It's taken from TideWysiwyg component.
  > h2:first-of-type {
    margin-top: 0;
  }

  a:not(.rpl-button) {
    text-decoration: none;
    color: $tide-link-color;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  .tide-external-link {
    &:after {
      content: '';
      display: inline-block;
      vertical-align: bottom;
      width: rem(18px);
      height: rem(22px);
      background-image: url('/img/external_link.png');
      background-repeat: no-repeat;
      background-position: center right;
      background-size: rem(14px) rem(14px);
    }
  }
}

</style>
