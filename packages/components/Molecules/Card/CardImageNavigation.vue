<template>
  <rpl-card-content :image="image" :link="link" type="inline" :border="false" class="rpl-card-image-navigation">
    <div class="rpl-card-image-navigation__details">
      <div class="rpl-card-image-navigation__meta" v-if="date || topic">
        <div class="rpl-card-image-navigation__date" v-if="date">{{ formatDate(date) }}</div>
        <div class="rpl-card-image-navigation__tag" >{{ topic }}</div>
      </div>
      <h2 class="rpl-card-image-navigation__title" v-if="title">{{ title }}</h2>
      <p v-if="summary" class="rpl-card-image-navigation__summary">{{ summary }}</p>
    </div>
  </rpl-card-content>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplCardContent from './CardContent.vue'

export default {
  name: 'RplCardImageNavigation',
  mixins: [formatdate],
  components: {
    RplCardContent
  },
  props: {
    image: [String, Object],
    date: String,
    topic: String,
    title: String,
    summary: String,
    link: Object
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-card-image-navigation-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-image-navigation-date-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-card-image-navigation-date-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-image-navigation-date-background-color: rpl_color('light_neutral') !default;
  $rpl-card-image-navigation-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-image-navigation-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-image-navigation-tag-text-color: rpl_color('primary') !default;
  $rpl-card-image-navigation-tag-margin: 0 0 0 $rpl-space-2 !default;
  $rpl-card-image-navigation-title-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    'm': ('xl', 1.2em, 'bold')
  ) !default;
  $rpl-card-image-navigation-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-image-navigation-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-image-navigation-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-image-navigation-summary-text-color: rpl_color('extra_dark_neutral') !default;

  .rpl-card-image-navigation {

    &__meta {
      margin: $rpl-card-image-navigation-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-image-navigation-date-ruleset);
      display: inline;
      color: $rpl-card-image-navigation-date-color;
      background-color: $rpl-card-image-navigation-date-background-color;
      padding: $rpl-card-image-navigation-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-image-navigation-tag-ruleset);
      display: inline;
      color: $rpl-card-image-navigation-tag-text-color;
      text-transform: uppercase;
      margin: $rpl-card-image-navigation-tag-margin;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-image-navigation-title-ruleset);
      color: $rpl-card-image-navigation-title-text-color;
      margin: $rpl-card-image-navigation-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-image-navigation-summary-ruleset);
      color: $rpl-card-image-navigation-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }
  }
</style>
