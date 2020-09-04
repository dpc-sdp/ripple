<template>
  <div class="tide-open-form">
    <a class="openforms-embed tide-open-form__link" :href="formLink">Click here to view form.</a>
  </div>
</template>

<script>
export default {
  name: 'TideOpenForm',
  props: {
    formLink: { default: null, type: String }
  },
  mounted: function () {
    let openFormsEmbedScript = document.createElement('script')
    openFormsEmbedScript.setAttribute('src', 'https://au.openforms.com/Scripts/embed-iframe.js?immediate=true')
    document.head.appendChild(openFormsEmbedScript)
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";

.tide-open-form {
  // This OpenForm component will cause high CLS(cumulative layout shift) issue.
  // Add a initial height to reduce CLS score.
  min-height: 500px;
  max-width: $rpl-content-max-width;

  &__link {
    display: inline-block;
    margin-top: 250px;
  }
}
</style>
