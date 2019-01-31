<template>
  <!-- Keep app-wysiwyg class here for backward compatibility, as some project may use that class for custom style -->
  <div class="rpl-markup tide-wysiwyg app-wysiwyg">
    <!-- Use dynamic component to render string template in runtime -->
    <component :is="{template:getTemplate}"/>
  </div>
</template>

<script>
import markupTranspiler from './markup-transpiler'

// To make runtime build work, we need to register the component globally
import Vue from 'vue'
import RplButton from '@dpc-sdp/ripple-button'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import {RplTextLink} from '@dpc-sdp/ripple-link'

Vue.component('rpl-button', RplButton)
Vue.component('rpl-document-link', RplDocumentLink)
Vue.component('rpl-text-link', RplTextLink)

export default {
  name: 'RplMarkup',
  props: {
    'html': String,
    'plugins': { type: Array },
    'options': { type: Object }
  },
  computed: {
    getTemplate () {
      // Run our transpile to turn html into vue template.
      const html = `<div class="rpl-markup__inner">${this.html}</div>`
      const plugins = this.plugins || this.rplOptions.rplMarkup.plugins
      const options = this.options || this.rplOptions.rplMarkup.options

      if (plugins && plugins.length > 0) {
        const template = markupTranspiler(html, plugins, options)
        return template
      }
      return html
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

$rpl-markup-link-color: rpl_color('primary') !default;

.rpl-markup {

  &__inner {
    > h2:first-child {
      margin-top: 0;
    }
  }

  a:not(.rpl-button) {
    text-decoration: none;
    color: $rpl-markup-link-color;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    @media print {
      width: auto;
      height: $rpl-print-image-height;
    }
  }
}
</style>
