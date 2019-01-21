<template>
  <!-- Keep app-wysiwyg class here for backward compatibility, as some project may use that class for custom style -->
  <div class="rpl-wysiwyg tide-wysiwyg app-wysiwyg">
    <!-- Use dynamic component to render string template in runntime -->
    <component :is="{template:getTemplate}"/>
  </div>
</template>

<script>
import { wysiwygTranspiler } from './wysiwyg-transpiler'

// To make runtime build work, we need to register the component globally
import Vue from 'vue'
import RplButton from '@dpc-sdp/ripple-button'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import {RplTextLink} from '@dpc-sdp/ripple-link'

Vue.component('rpl-button', RplButton)
Vue.component('rpl-document-link', RplDocumentLink)
Vue.component('rpl-text-link', RplTextLink)

export default {
  name: 'RplWysiwyg',
  props: {
    'html': String,
    'plugins': { type: Array },
    'parseForAnchorLinks': { type: Boolean, default: false }
  },
  mounted () {
    this.$nextTick(function () {
      // TODO make this a plugin
      this.tableRender()
    })
  },
  methods: {
    tableRender () {
      // Wrap tables with a div.
      const tables = Array.from(this.$el.querySelectorAll('table'))
      tables.forEach(table => {
        let wrapper = document.createElement('div')
        wrapper.className = 'table-container'
        table.parentNode.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      })
    }
  },
  computed: {
    getTemplate () {
      // Run our transpile to turn html into vue template.
      const html = `<div class="rpl-wysiwyg__inner">${this.html}</div>`

      if (this.plugins.length > 0) {
        const template = wysiwygTranspiler(html, this.plugins)
        return template
      }
      return html
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "./scss/_callout.scss";
@import "./scss/_quotation.scss";
@import "./scss/_embedded-entity.scss";
@import "./scss/_embedded-entity-video.scss";
@import "./scss/_image.scss";
@import "./scss/_table.scss";
@import "./scss/_lists.scss";

$tide-link-color: rpl-color('primary') !default;

.rpl-wysiwyg {
  @include rpl_mobile_padding;

  @include rpl_breakpoint(m) {
    padding-left: 0;
    padding-right: 0;
  }

  &__inner {
    > h2:first-of-type {
      margin-top: 0;
    }
  }

  a:not(.rpl-button) {
    text-decoration: none;
    color: $tide-link-color;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  .tide-external-link {
    &:after {
      content: '';
      display: inline-block;
      vertical-align: bottom;
      width: rem(18px);
      height: rem(22px);
      background-image: url('/img/external_link.png');
      background-repeat: no-repeat;
      background-position: center right;
      background-size: rem(14px) rem(14px);
    }
  }
}
</style>
