<template>
  <div class="rpl-share-this">
    <h2 v-if="title" class="rpl-share-this__title" id="rpl-share-this__title">{{ title }}</h2>
    <social-sharing :url="url" inline-template networkTag="a">
      <ul class="rpl-share-this__list" :aria-label="$parent.en.label">
        <li v-for="network in $parent.en.networks" :key="network.name">
          <network :network="network.name" class="rpl-share-this__social rpl-share-this__button">
            <span class="rpl-share-this__icon">
                <rpl-icon :symbol="network.iconName" color="primary" :size="network.iconSize"/>
            </span>
            {{network.label}}
            <span class="rpl-share-this__hint">, opens a new window</span>
          </network>
        </li>
        <li v-if="$parent.en.emailEnabled">
          <rpl-link :href="$parent.en.emailUrl" :innerWrap="false"
                    class="rpl-share-this__social rpl-share-this__button">
            <span class="rpl-share-this__icon">
                <rpl-icon symbol="email_solid" color="primary" size="0.65"/>
            </span>
            Email
            <span class="rpl-share-this__hint">, opens a new window</span>
          </rpl-link>
        </li>
      </ul>
    </social-sharing>
  </div>
</template>

<script>
import Vue from 'vue'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplLink from '@dpc-sdp/ripple-link'
import SocialSharing from 'vue-social-sharing'

// Need to register as global component so it can be used inside vue-social-sharing.
Vue.component('rpl-icon', RplIcon)
Vue.component('rpl-link', RplLink)

export default {
  name: 'RplShareThis',
  props: {
    url: String,
    title: String,
    label: String,
    networks: {
      type: Array,
      default: () => [
        {
          name: 'twitter',
          label: 'Twitter',
          iconName: 'twitter',
          iconSize: '0.81'
        },
        {
          name: 'facebook',
          label: 'Facebook',
          iconName: 'facebook',
          iconSize: '1'
        },
        {
          name: 'linkedin',
          label: 'LinkedIn',
          iconName: 'linkedin',
          iconSize: '0.81'
        }
      ]
    },
    emailSubject: String,
    emailBody: String
  },
  components: {
    SocialSharing
  },
  computed: {
    // vue-social-sharing requires to use computed props to pass dynamic data.
    // https://github.com/nicolasbeauvais/vue-social-sharing/issues/83
    en () {
      return {
        label: this.label || 'Social networks',
        networks: this.networks || [],
        emailEnabled: Boolean(this.emailSubject || this.emailBody),
        emailUrl: `mailto:?subject=${this.emailSubject}&body=${this.emailBody}%0D%0A %0D%0A${this.url}`
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
