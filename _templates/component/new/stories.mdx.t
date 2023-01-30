---
to: "<%= mdx ? `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${h.rplcomponentname(name)}.stories.mdx` : null %>"
---

import {
  Canvas,
  Meta,
  Story,
  ArgsTable
} from '@storybook/addon-docs'
import <%= h.rplcomponentname(name) %> from './<%= h.rplcomponentname(name) %>.vue'
import { <%= h.rplcomponentname(name) %>Variants } from './constants'
import { a11yStoryCheck } from './../../../stories/interactions.js'

export const SingleTemplate = (args) => ({
  components: { Rpl<%= h.changeCase.pascal(name) %> },
  setup() {
    return { args }
  },
  template: '<<%= h.rplcomponentname(name) %> v-bind="args" />'
})

<Meta
  title='WIP/Components/<%= h.changeCase.sentenceCase(name) %>'
  component={<%= h.rplcomponentname(name) %>}
  argTypes={{
    variant: {
      control: { type: 'radio' },
      options: <%= h.rplcomponentname(name) %>Variants,
    }
  }}
  args={{
    variant: <%= h.rplcomponentname(name) %>Variants[0]
  }}
/>

# <%= h.changeCase.sentenceCase(name) %>

<ArgsTable of={<%= h.rplcomponentname(name) %>} />

<Canvas>
  <Story
    name='<%= h.changeCase.sentenceCase(name) %>'
    play={a11yStoryCheck}
  >
    {SingleTemplate.bind()}
  </Story>
</Canvas>
