<template>
  <a v-if="!isNuxtLink" @focus="onFocus" class="rpl-link" :href="href">
    <slot></slot>
  </a>
  <nuxt-link v-else @focus.native="onFocus" class="rpl-link rpl-link--nuxt" :to="href">
    <slot></slot>
  </nuxt-link>
</template>

<script>
import { focus } from 'vue-focus'
import { isRelativeUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplLink',
  props: {
    href: String
  },
  directives: {
    focus
  },
  data: function () {
    return {
      isNuxtLink: false
    }
  },
  methods: {
    onFocus: function (e) {
      this.$emit('focus', e)
    }
  },
  created: function () {
    if (isRelativeUrl(this.href)) {
      this.isNuxtLink = this.rplOptions.nuxt
    }
  }
}
</script>

<style lang="scss">
.rpl-link {
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
</style>
