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
    },
    isRelativeUrl: function (url) {
      var reg = new RegExp('^(?!(?:[a-z]+:)?//)', 'i')
      return reg.test(url)
    }
  },
  created: function () {
    if (this.isRelativeUrl(this.href)) {
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
