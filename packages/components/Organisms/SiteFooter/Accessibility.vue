<template>
  <div class="rpl-accessibility" :class="themeClass">
    <div class="rpl-accessibility__title">{{ title }}</div>
    <div class="rpl-accessibility__message" v-html="message"></div>
  </div>
</template>

<script>
export default {
  name: 'RplAccessibility',
  props: {
    title: { type: String, default: 'Deaf, hearing or speech impaired?' },
    template: {
      type: String,
      default: 'Please contact the National Relay Service on: <a class="rpl-accessibility__links" href=%phoneLink%>%phoneText%</a> or <a class="rpl-accessibility__links" href=%websiteLink%>%websiteText%</a>'
    },
    links: {
      type: Object,
      default: () => ({
        '%phoneLink%': 'tel:133677',
        '%phoneText%': '133 677',
        '%websiteLink%': 'http://www.relayservice.gov.au',
        '%websiteText%': 'www.relayservice.gov.au'
      })
    },
    theme: { type: String, default: 'default' }
  },
  computed: {
    themeClass () {
      return (this.theme === 'standalone') ? ['rpl-accessibility--standalone', 'rpl-site-constrain--on-all'] : null
    },
    message () {
      return this.template.replace(/%\w+%/g, key => (this.links[key] || key))
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-accessibility-ruleset-title: ('s', 1.25em, 'semibold') !default;
  $rpl-accessibility-ruleset-message: ('xs', 1.43em, 'regular') !default;

  .rpl-accessibility {
    $root: &;
    text-align: left;

    &__title {
      @include rpl_typography_ruleset($rpl-accessibility-ruleset-title);
      margin-top: $rpl-space-3;
    }

    &__message {
      @include rpl_typography_ruleset($rpl-accessibility-ruleset-message);
    }

    &__links {
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
