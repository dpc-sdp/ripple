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
import { <%= h.rplcomponentname(name) %>Variants } from './constants'
import { a11yStoryCheck } from './../../../stories/interactions.js'

export const SingleTemplate = (args) => ({
  components: { Rpl<%= h.changeCase.pascal(name) %> },
  setup() {
    return { args }
  },
  template: '<<%= h.rplcomponentname(name) %> v-bind="args" />'
})

<Meta title='WIP/<%= h.changeCase.sentenceCase(name) %>' component={<%= h.rplcomponentname(name) %>} />

# <%= h.changeCase.sentenceCase(name) %>

<ArgsTable of={<%= h.rplcomponentname(name) %>} />

<Canvas>
  <Story
    name='Default'
    play={a11yStoryCheck}
    argTypes={{
      variant: {
        control: { type: 'select' },
        options: <%= h.rplcomponentname(name) %>Variants,
        defaultValue: <%= h.rplcomponentname(name) %>Variants[0]
      }
    }}
  >
    {SingleTemplate.bind()}
  </Story>
</Canvas>
