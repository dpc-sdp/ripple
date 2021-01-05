<template>
  <div class="app-error">
    <h1 class="rpl-visually-hidden">Oops</h1>
    <img class="app-error-img" alt="oops" title="oops graphic" :src="errorMsg.img">
    <div class="app-error-intro" v-html="errorMsg.intro"></div>
    <div class="app-error-main" v-html="errorMsg.main"></div>

    <rpl-button class="app-error-cta" theme="primary" :href="errorMsg.cta.url" >{{errorMsg.cta.text}}</rpl-button>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'AppError',
  components: {
    RplLink,
    RplButton
  },
  data () {
    return {
      defaultErrMsg: {
        '404': {
          img: '/img/oops-banner.svg',
          intro: `This is the 404 error message.<br>Sorry, we couldn't find the page you were looking for.`,
          main: `Have a look at the web address to make sure it was typed correctly. We may also have deleted this page.
      If none of our suggestions help you find the information you were looking for,
      please <a class="rpl-link" href="/connect-with-us">contact us</a>.`,
          cta: {
            url: `/`,
            text: `Go to home`
          }
        },
        other: {
          img: '/img/sorry-banner.svg',
          intro: `We have a glitch in our system.`,
          main: `We are aware of the issue. We appreciate your patience while we're looking into it.`,
          cta: {
            url: `/`,
            text: `Go to home`
          }
        }
      }
    }
  },
  props: {
    type: String
  },
  computed: {
    customErrMsg () {
      return this.$store.state.tide.siteData.errorPage
    },
    errorMsg () {
      let msg = this.defaultErrMsg[this.type]

      if (typeof this.customErrMsg !== 'undefined' && this.customErrMsg[this.type]) {
        const customMsg = this.customErrMsg[this.type]
        msg.img = customMsg.img ? customMsg.img : msg.img
        msg.intro = customMsg.intro ? customMsg.intro : msg.intro
        msg.main = customMsg.main ? customMsg.main : msg.main
        msg.cta = customMsg.cta ? customMsg.cta : msg.cta
      }
      return msg
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $app-error-intro-ruleset: (
    'xs': ('l', 1.5em, 'bold'),
    'm': ('mega', 1.5em, 'bold')
  ) !default;
  $app-error-main-ruleset: (
    'xs': ('s', 1.5em, 'medium'),
    'm': ('m', 2em, 'medium')
  ) !default;
  $app-error-max-width-m: rem(600px) !default;
  $app-error-max-width-l: rem(930px) !default;
  $app-error-padding-top: 6%;
  $app-error-padding-bottom: 10%;
  $app-error-intro-margin-bottom: 1rem;
  $app-error-img-margin-bottom: 1.5rem;
  $app-error-img-margin-bottom-l: 2.5rem;
  $app-error-img-margin-width-xs: rem(250px);
  $app-error-img-margin-width-m: rem(500px);
  $app-error-img-margin-width-l: rem(870px);
  .app-error {
    @include rpl_mobile_padding;
    text-align: center;
    margin: 0 auto;
    padding-top: $app-error-padding-top;
    padding-bottom: $app-error-padding-bottom;
    @include rpl_breakpoint('m') {
      max-width: $app-error-max-width-m;
    }
    @include rpl_breakpoint('l') {
      max-width: $app-error-max-width-l;
    }
  }
  .app-page {
    @each $bp, $val in $rpl-layout-top-margin {
      @include rpl_breakpoint($bp) {
        margin-top: $val;
      }
    }
  }
  .app-error-img {
    margin-bottom:$app-error-img-margin-bottom;
    max-width: $app-error-img-margin-width-xs;
    @include rpl_breakpoint('m') {
      max-width: $app-error-img-margin-width-m;
    }
    @include rpl_breakpoint('l') {
      margin-bottom: $app-error-img-margin-bottom-l;
      max-width: $app-error-img-margin-width-l;
    }
  }
  .app-error-intro {
    @include rpl_typography_ruleset($app-error-intro-ruleset);
    margin-bottom: $app-error-intro-margin-bottom;
  }
  .app-error-main {
    @include rpl_typography_ruleset($app-error-main-ruleset);
    margin-bottom: 3rem;
  }
</style>
