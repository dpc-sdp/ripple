---
to: "<%= mdx ? null : `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${h.changeCase.paramCase(name)}.stories.js` %>"
---
import <%= h.rplcomponentname(name) %> from './<%= h.changeCase.paramCase(name) %>.vue'
import { <%= h.rplcomponentname(name) %>Variants } from './constants.ts'
import { a11yStoryCheck } from './../../../stories/interactions.js'

export default {
  title: 'WIP/<%= h.inflection.humanize(h.inflection.underscore(name)) %>',
  component: <%= h.rplcomponentname(name) %>,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: <%= h.rplcomponentname(name) %>Variants
    }
  }
}

const Template = (args) => ({
  components: { <%= h.rplcomponentname(name) %> },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  template: '<<%= h.rplcomponentname(name) %> %> v-bind="args" />'
})

export const Default = Template.bind({})
Default.play = a11yStoryCheck
Default.args = {
  variant: <%= h.rplcomponentname(name) %>Variants[0]
}

