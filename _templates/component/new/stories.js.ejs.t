---
to: "<%= mdx ? null : `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${h.changeCase.paramCase(name)}.stories.js` %>"
---
import <%= h.rplcomponentname(name) %> from './<%= h.changeCase.paramCase(name) %>.vue'
import { <%= h.rplcomponentname(name) %>Themes } from './constants.ts'
export default {
  title: 'Components/<%= h.inflection.humanize(h.inflection.underscore(name)) %>',
  component: <%= h.rplcomponentname(name) %>,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: <%= h.rplcomponentname(name) %>Themes
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
Default.args = {
  theme: <%= h.rplcomponentname(name) %>Themes[0]
}

