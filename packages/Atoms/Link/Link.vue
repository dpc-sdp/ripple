<template>
  <a v-if="!isNuxtLink" @focus="onFocus" class="rpl-link" :href="href" :target="linkTarget">
    <span>
      <slot></slot>
    </span>
  </a>
  <nuxt-link v-else @focus.native="onFocus" class="rpl-link rpl-link--nuxt" :to="href" @click.native="routeLinkClick">
    <span>
      <slot></slot>
    </span>
  </nuxt-link>
</template>

<script>
import { focus } from 'vue-focus'
import { isRelativeUrl, isExternalUrl, isAnchorLink } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplLink',
  props: {
    href: String,
    target: { type: String, default: '' }
  },
  directives: {
    focus
  },
  data: function () {
    return {
      isNuxtLink: false,
      linkTarget: null
    }
  },
  methods: {
    onFocus: function (e) {
      this.$emit('focus', e)
    },
    routeLinkClick: function (e) {
      // Triggering an active link will reload the page.
      if (e.target.classList.contains('nuxt-link-active')) {
        window.location.href = e.target.attributes.href.value
      }
    }
  },
  created: function () {
    if (!isAnchorLink(this.href) && isRelativeUrl(this.href)) {
      this.isNuxtLink = this.rplOptions.nuxt
    }
    // Set link target for non nuxt-links
    if (this.target.length === 0) {
      if (isExternalUrl(this.href, this.rplOptions.hostname)) {
        this.linkTarget = '_blank'
      }
    } else {
      this.linkTarget = this.target
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
      content: ' <' attr(href) '> ';
    }
    &[href^="tel:"]:after {
      content: "";
    }
  }

  & > span {
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
