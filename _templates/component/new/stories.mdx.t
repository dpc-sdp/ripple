---
to: "<%= mdx ? `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${h.changeCase.paramCase(name)}.stories.mdx` : null %>"
---

import {
  Canvas,
  Meta,
  Story,
  ArgsTable
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

<Meta title='Components/<%= h.changeCase.sentenceCase(name) %>' component={<%= h.rplcomponentname(name) %>} />

# <%= h.changeCase.sentenceCase(name) %>

<ArgsTable of={<%= h.rplcomponentname(name) %>} />

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
