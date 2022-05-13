---
to: "<%= mdx ? `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${name}.stories.mdx` : null %>"
---

import {
  Canvas,
  Meta,
  Story
} from '@storybook/addon-docs'
import <%= h.rplcomponentname(name) %> from './<%= h.changeCase.paramCase(name) %>.vue'
import { <%= h.rplcomponentname(name) %>Themes } from './constants'

export const SingleTemplate = (args) => ({
  components: { Rpl<%= h.changeCase.pascal(name) %> },
  setup() {
    return { args }
  },
  template: '<<%= h.rplcomponentname(name) %> v-bind="args" />'
})

<Meta title='Components/<%= h.inflection.humanize(h.inflection.underscore(name)) %>' component={<%= h.rplcomponentname(name) %>} />

# <%= h.inflection.humanize(h.inflection.underscore(name)) %>

<Canvas>
  <Story
    name='Default'
    argTypes={{
      theme: {
        control: { type: 'select' },
        options: <%= h.rplcomponentname(name) %>Themes,
        defaultValue: <%= h.rplcomponentname(name) %>Themes[0]
      }
    }}
  >
    {SingleTemplate.bind()}
  </Story>
</Canvas>
