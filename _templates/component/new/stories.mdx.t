---
to: "<%= mdx ? `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${name}.stories.mdx` : null %>"
---

import {
  Canvas,
  Meta,
  Story
} from '@storybook/addon-docs'
import Rpl<%= name %> from './<%= name %>.vue'

export const SingleTemplate = (args) => ({
  components: { Rpl<%= h.changeCase.pascal(name) %> },
  setup() {
    return { args }
  },
  template: '<Rpl<%= name %> v-bind="args" />'
})

<Meta title='Components/<%= h.inflection.humanize(h.inflection.underscore(name)) %>' />

# Rpl<%= name %>

<Canvas>
  <Story
    name='Default'
    argTypes={{
      theme: {
        control: { type: 'select' },
        options: ['core', 'accent', 'neutral'],
        defaultValue: 'core'
      }
    }}
  >
    {SingleTemplate.bind()}
  </Story>
</Canvas>
