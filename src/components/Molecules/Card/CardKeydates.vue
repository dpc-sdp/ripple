<template>
  <rpl-card-content :link="link" class="rpl-card-event">
    <h2 class="rpl-card-keydates__title" v-if="title">{{ title }}</h2>
    <div class="rpl-card-keydates__keydate" v-for="(keydate, index) in keydates" :key="index">
      <div class="rpl-card-keydates__keydate-date">
        <rpl-icon symbol="calendar" color="white" />
        <span>{{ keydate.date }}</span>
      </div>
      <h3 class="rpl-card-keydates__keydate-title">{{ keydate.title }}</h3>
      <p class="rpl-card-keydates__keydate-description">{{ keydate.description }}</p>
    </div>
  </rpl-card-content>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplCardContent from './CardContent.vue'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardKeydates',
  mixins: [formatdate],
  props: {
    title: String,
    keydates: Array,
    link: Object
    // TODO: currently Tide is just use plain text field for date, so no way to format it
    // locale: { default: 'en-au', type: String }
  },
  components: {
    RplCardContent,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-keydates-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-keydates-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-keydates-keydate-date-ruleset: ('l', 1em, 'bold') !default;
  $rpl-card-keydates-keydate-date-background: rpl_color('secondary') !default;
  $rpl-card-keydates-keydate-date-text-color: rpl_color('white') !default;
  $rpl-card-keydates-keydate-date-padding: $rpl-space-2 !default;
  $rpl-card-keydates-keydate-date-margin: 0 0 $rpl-space-3 !default;
  $rpl-card-keydates-keydate-date-icon-margin: rem(-2px) auto 0 !default;
  $rpl-card-keydates-keydate-title-ruleset: ('xs', 1.4em, 'bold') !default;
  $rpl-card-keydates-keydate-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-keydate-title-margin: 0 0 $rpl-space-2 !default;
  $rpl-card-keydates-keydate-description-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-card-keydates-keydate-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-keydate-description-margin: $rpl-space-2 0 !default;

  .rpl-card-keydates {
    &__title {
      @include rpl_typography_ruleset($rpl-card-keydates-title-ruleset);
      color: $rpl-card-keydates-title-text-color;
      margin: $rpl-card-keydates-title-margin;
    }

    &__keydate-date {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-date-ruleset);
      background: $rpl-card-keydates-keydate-date-background;
      color: $rpl-card-keydates-keydate-date-text-color;
      display: inline-block;
      padding: $rpl-card-keydates-keydate-date-padding;
      margin: $rpl-card-keydates-keydate-date-margin;

      .rpl-icon,
      span {
        vertical-align: middle;
      }

      .rpl-icon {
        margin-top: $rpl-card-keydates-keydate-date-icon-margin;
        margin-right: $rpl-space;
      }
    }

    &__keydate-title {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-title-ruleset);
      color: $rpl-card-keydates-keydate-title-text-color;
      margin: $rpl-card-keydates-keydate-title-margin;
    }

    &__keydate-description {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-description-ruleset);
      color: $rpl-card-keydates-keydate-description-text-color;
      margin: $rpl-card-keydates-keydate-description-margin;
    }
  }
</style>
