<template>
  <div class="rpl-share-this">
    <h2 v-if="title" class="rpl-share-this__title" id="rpl-share-this__title">{{ title }}</h2>
    <social-sharing :url="url" inline-template networkTag="button">
      <ul class="rpl-share-this__list" :aria-label="label || 'Social networks'">
        <li v-if="$parent.en.twitter">
          <network network="twitter" class="rpl-share-this__social rpl-share-this__button">
            <span class="rpl-share-this__icon"><rpl-icon symbol="twitter" color="primary" /></span>Twitter
            <span class="rpl-share-this__hint">, opens a new window</span>
          </network>
        </li>
        <li v-if="$parent.en.facebook">
          <network network="facebook" class="rpl-share-this__social rpl-share-this__button">
            <span class="rpl-share-this__icon"><rpl-icon symbol="facebook" color="primary" /></span>Facebook
            <span class="rpl-share-this__hint">, opens a new window</span>
          </network>
        </li>
        <li v-if="$parent.en.linkedin">
          <network network="linkedin" class="rpl-share-this__social rpl-share-this__button">
            <span class="rpl-share-this__icon"><rpl-icon symbol="linkedin" color="primary" /></span>LinkedIn
            <span class="rpl-share-this__hint">, opens a new window</span>
          </network>
        </li>
      </ul>
    </social-sharing>
  </div>
</template>

<script>
import Vue from 'vue'
import RplIcon from '@dpc-sdp/ripple-icon'
import SocialSharing from 'vue-social-sharing'

// Need to register as global component so it can be used inside vue-social-sharing.
Vue.component('rpl-icon', RplIcon)

export default {
  name: 'RplShareThis',
  props: {
    url: String,
    title: String,
    label: String,
    enabled: {
      type: Object,
      default: function () {
        return {
          twitter: true,
          facebook: true,
          linkedin: true
        }
      }
    }
  },
  components: {
    SocialSharing
  },
  data: function () {
    return {
      socialIconScale: {
        'facebook': '1',
        'instagram': '0.81',
        'linkedin': '0.81',
        'twitter': '0.81'
      }
    }
  },
  computed: {
    // vue-social-sharing requires to use computed props to pass dynamic data.
    // https://github.com/nicolasbeauvais/vue-social-sharing/issues/83
    en () {
      return {
        twitter: this.enabled.twitter,
        facebook: this.enabled.facebook,
        linkedin: this.enabled.linkedin
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-share-this-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-share-this-title-ruleset: ('l', 1.2rem, 'bold');
  $rpl-share-this-title-margin: 0 0 $rpl-space-4;
  $rpl-share-this-margin-l: $rpl-space-4 0;
  $rpl-share-this-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-share-this-icon-min-width: $rpl-space-4;
  $rpl-share-this-icon-margin: $rpl-space;
  $rpl-share-this-icon-margin-l: $rpl-space-2;
  $rpl-share-this-social-ruleset: ('xs', 1.2rem, 'medium');
  $rpl-share-this-social-margin-xs: 0 $rpl-space-2 $rpl-space 0;
  $rpl-share-this-social-margin-l: 0 0 $rpl-space;

  .rpl-share-this {
    @include rpl_breakpoint('l') {
      margin: $rpl-share-this-margin-l;
    }

    @include rpl_print_hidden;

    &__title {
      @include rpl_typography_ruleset($rpl-share-this-title-ruleset);
      color: $rpl-share-this-title-color;
      margin: $rpl-share-this-title-margin;
    }

    &__icon {
      min-width: $rpl-share-this-icon-min-width;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-right: $rpl-share-this-icon-margin;
      @include rpl_breakpoint('l') {
        margin-right: $rpl-share-this-icon-margin-l;
      }
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__button {
      @include rpl_typography_ruleset($rpl-share-this-social-ruleset);
      color: $rpl-share-this-link-color;
      margin: $rpl-share-this-social-margin-xs;
      display: inline-block;
      border: 0;
      background: 0;
      padding: 0;
      line-height: inherit;
      cursor: pointer;

      @include rpl_breakpoint('l') {
        display: block;
        margin: $rpl-share-this-social-margin-l;
      }

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    &__hint {
      @include rpl_visually_hidden;
    }

  }
</style>
