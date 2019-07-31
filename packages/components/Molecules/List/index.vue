<template>
  <div
    class="rpl-list"
    :class="{
      'rpl-list--normal': (size === 'normal'),
      'rpl-list--large': (size === 'large')
    }"
  >
    <h2 v-if="title" class="rpl-list__title">
      <rpl-text-link v-if="link" :url="link" :text="title" class="rpl-list__title-inner" />
      <span v-else class="rpl-list__title-inner">{{ title }}</span>
    </h2>
    <slot name="above-list"></slot>
    <div v-if="list" class="rpl-list__list">
      <div v-for="(item, index) in list" :key="`${index}-${id}`" :data-tid="testId(item)" class="rpl-list__list-item">
        <span class="rpl-list__icon">
          <rpl-icon v-if="item.symbol" :symbol="item.symbol" :color="item.color || iconColor" :size="iconSize(item)" /></span>
          <rpl-link v-if="item.link" :href="item.link" class="rpl-list__text">{{ item.text }}</rpl-link>
          <span v-else :href="item.link" class="rpl-list__text">{{ item.text }}</span>
      </div>
    </div>
    <slot name="below-list"></slot>
  </div>
</template>

<script>
import { RplLink, RplTextLink } from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplList',
  props: {
    title: String,
    link: String,
    size: { type: String, default: 'normal' },
    iconScale: { type: Number, default: 1 },
    iconColor: { type: String, default: 'primary' },
    list: Array
  },
  components: {
    RplLink,
    RplTextLink,
    RplIcon
  },
  methods: {
    iconSize (item) {
      const size = (item.size ? item.size : 1) * this.iconScale
      return size.toString()
    },
    testId (item) {
      return item.id ? item.id : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-list-title-normal-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-list-title-large-ruleset: ('mega', 1em, 'bold') !default;
  $rpl-list-title-normal-margin: 0 0 $rpl-space-4 !default;
  $rpl-list-title-large-margin: 0 0 $rpl-space-4 !default;
  $rpl-list-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-list-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-list-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-list-text-padding: 0 0 $rpl-space-3 !default;
  $rpl-list-icon-normal-padding: 0 $rpl-space-2 $rpl-space-3 0 !default;
  $rpl-list-icon-large-padding: 0 $rpl-space-3 $rpl-space-3 0 !default;
  $rpl-list-text-normal-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-list-text-large-ruleset: ('s', 1.5em, 'bold') !default;

  .rpl-list {
    $root: &;
    @include rpl_text_color($rpl-list-text-color);

    &__title {
      #{$root}--normal & {
        @include rpl_typography_ruleset($rpl-list-title-normal-ruleset);
        margin: $rpl-list-title-normal-margin;
      }

      #{$root}--large & {
        @include rpl_typography_ruleset($rpl-list-title-large-ruleset);
        margin: $rpl-list-title-large-margin;
      }
    }

    &__title-inner {
      @include rpl_text_color($rpl-list-title-color);
    }

    &__list {
      display: table;
    }

    &__list-item {
      display: table-row;
    }

    &__icon {
      display: table-cell;
      text-align: center;

      #{$root}--normal & {
        padding: $rpl-list-icon-normal-padding;
      }

      #{$root}--large & {
        padding: $rpl-list-icon-large-padding;
      }
    }

    &__text {
      @include rpl_text_color($rpl-list-link-color);
      display: table-cell;
      padding: $rpl-list-text-padding;

      #{$root}--normal & {
        @include rpl_typography_ruleset($rpl-list-text-normal-ruleset);
      }

      #{$root}--large & {
        @include rpl_typography_ruleset($rpl-list-text-large-ruleset);
      }
    }

    .rpl-icon {
      vertical-align: middle;
    }
  }
</style>
