---
to: "<%= mdx ? `packages/ripple-ui-core/src/components/${name}/${h.changeCase.paramCase(name)}.stories.mdx` : null %>"
---

import {
  Canvas,
  Meta,
  Story
} from '@storybook/addon-docs'
import Rpl<%= h.changeCase.pascal(name) %> from './index.vue'

export const SingleTemplate = (args) => ({
  components: { Rpl<%= h.changeCase.pascal(name) %> },
  setup() {
    return { args }
  },
  template: '<Rpl<%= h.changeCase.pascal(name) %> v-bind="args" />'
})

<Meta title='Example/<%= h.changeCase.pascal(name) %>' />

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
