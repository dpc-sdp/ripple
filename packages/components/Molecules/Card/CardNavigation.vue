<template>
  <rpl-card-content :link="link" type="simple" :border="false" class="rpl-card-navigation">
    <h2
      v-if="title"
      class="rpl-card-navigation__title"
      :class="{'rpl-card-navigation__title--with-summary' : summary }"
    >{{ title }}</h2>
    <p v-if="summary" class="rpl-card-navigation__summary">{{ summary }}</p>
  </rpl-card-content>
</template>

<script>
import RplCardContent from './CardContent.vue'
import deprecate from '@dpc-sdp/ripple-global/mixins/deprecate'

export default {
  name: 'RplCardNavigation',
  mixins: [deprecate],
  components: {
    RplCardContent
  },
  props: {
    title: String,
    summary: String,
    link: Object
  },
  mounted () {
    this.deprecatedWarn('"rpl-card-navigation" is deprecated, please import "rpl-card-nav" from @dpc-sdp/ripple-card-nav instead')
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-card-navigation-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('mega', 1.3em, 'bold')
  ) !default;
  $rpl-card-navigation-title-margin: 0 0 rem(12px) !default;
  $rpl-card-navigation-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-navigation-summary-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-card-navigation-summary-color: rpl_color('extra_dark_neutral') !default;

  .rpl-card-navigation {
    $root: &;

    &__title {
      @include rpl_typography_ruleset($rpl-card-navigation-title-ruleset);
      margin: 0;
      color: $rpl-card-navigation-title-color;

      &--with-summary {
        margin: $rpl-card-navigation-title-margin;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-navigation-summary-ruleset);
      margin: 0;
      color: $rpl-card-navigation-summary-color;
    }
  }
</style>
