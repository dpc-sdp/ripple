<template>
  <rpl-card-content class="rpl-card-compact" :border="false" :link="linkOnly">
    <img class="rpl-card-compact__image" v-if="image" ref="image" :src="image" alt="" />
    <div class="rpl-card-compact__main">
      <h2 class="rpl-card-compact__title" v-if="title">{{ title }}</h2>
      <div v-if="summary" class="rpl-card-compact__summary" v-html="summary"></div>
    </div>
  </rpl-card-content>
</template>

<script>
import RplCardContent from '@dpc-sdp/ripple-card/CardContent'

export default {
  name: 'RplCardCompact',
  components: {
    RplCardContent
  },
  props: {
    image: String,
    title: String,
    summary: String,
    link: Object
  },
  data () {
    return {
      linkOnly: { text: null, url: this.link.url }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-card/scss/card";

$rpl-card-compact-title-ruleset: ('l', 1.2em, 'bold') !default;
$rpl-card-compact-title-text-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-compact-title-text-color-hover: rpl_color('primary') !default;
$rpl-card-compact-title-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-compact-summary-ruleset: ('s', 1.5em, 'regular') !default;
$rpl-card-compact-summary-text-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-compact-image-width: rem(52px) !default;
$rpl-card-compact-image-height: rem(52px) !default;

.rpl-card-compact {

  &.rpl-card-content {
    background: none;
    border: none;
    border-radius: 0;
    height: auto;
    padding: 0;
    padding-bottom: rem(8px);

    @include rpl_breakpoint('s') {
      padding-bottom: rem(24px);
    }

    @include rpl_breakpoint('l') {
      padding-bottom: rem(16px);
    }

    &:hover {
      box-shadow: none;
    }
  }

  .rpl-card-content__details {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;

    @include rpl_breakpoint('s') {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__image {
    width: $rpl-card-compact-image-width;
    height: $rpl-card-compact-image-height;
    flex: 0 0 auto;
    padding-right: rem(20px);

    @include rpl_breakpoint('s') {
      padding-bottom: rem(20px);
    }
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-compact-title-ruleset);
    color: $rpl-card-compact-title-text-color;
    margin: $rpl-card-compact-title-margin;
  }

  &__summary {
    @include rpl_typography_ruleset($rpl-card-compact-summary-ruleset);
    color: $rpl-card-compact-summary-text-color;
    margin: 0;
  }

  &:hover {
    .rpl-card-compact__title {
      color: $rpl-card-compact-title-text-color-hover;
    }
  }
}
</style>
