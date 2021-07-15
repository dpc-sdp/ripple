<template>
  <a v-if="!isNuxtLink" @focus="onFocus" class="rpl-link" :href="href" :target="linkTarget" :data-print-url="printUrl">
    <span v-if="innerWrap" class="rpl-link__inner">
      <slot></slot>
    </span>
    <template v-else>
      <slot></slot>
    </template>
  </a>
  <nuxt-link v-else @focus.native="onFocus" class="rpl-link rpl-link--nuxt" :to="href" @click.native="routeLinkClick" :data-print-url="printUrl">
    <span v-if="innerWrap" class="rpl-link__inner">
      <slot></slot>
    </span>
    <template v-else>
      <slot></slot>
    </template>
  </nuxt-link>
</template>

<script>
import { focus } from 'vue-focus'
import { isRelativeUrl, isExternalUrl, isAnchorLink } from '@dpc-sdp/ripple-global/utils/helpers.js'
import { RplLinkEventBus } from './index'

export default {
  name: 'RplLink',
  props: {
    href: String,
    target: { type: String, default: '' },
    innerWrap: { type: Boolean, default: true }
  },
  directives: {
    focus
  },
  data: function () {
    return {
      isNuxtLink: false
    }
  },
  computed: {
    printUrl () {
      return isRelativeUrl(this.href) ? `${this.rplOptions.origin}${this.href}` : this.href
    },
    linkTarget () {
      // Set link target for non nuxt-links, if global option is true
      if (this.target.length === 0 && this.rplOptions.externalLinksInNewWindow) {
        if (isExternalUrl(this.href, this.rplOptions.hostname)) {
          return '_blank'
        }
      } else {
        return this.target.length > 0 ? this.target : false
      }
    }
  },
  methods: {
    onFocus: function (e) {
      this.$emit('focus', e)
    },
    routeLinkClick: function () {
      // Triggering an active link will reload the page.
      if (this.href === window.location.pathname) {
        window.location.href = this.href
      }
      if (this.isNuxtLink) {
        RplLinkEventBus.$emit('navigate', 'route changed')
      }
    }
  },
  created: function () {
    if (!isAnchorLink(this.href) && isRelativeUrl(this.href)) {
      this.isNuxtLink = this.rplOptions.nuxt
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.rpl-link {
  text-decoration: none;

  @include rpl_print {
    &[href]:after {
      content: ' <' attr(data-print-url) '> ';
    }
    &[href^="tel:"]:after {
      content: "";
    }
  }

  &__inner {
    display: inline;

    @include rpl_print {
      text-decoration: underline;
    }
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
</style>
