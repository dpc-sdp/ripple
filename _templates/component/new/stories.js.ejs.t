---
to: "<%= mdx ? null : `packages/ripple-ui-core/src/components/${h.changeCase.paramCase(name)}/${name}.stories.js` %>"
---


import Rpl<%= name %> from './<%= name %>.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/<%= h.inflection.humanize(h.inflection.underscore(name)) %>',
  component: Rpl<%= name %>,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Rpl<%= name %> },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<Rpl<%= h.changeCase.paramCase(name) %> v-bind="args" />'
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  label: '<%= name %>',
  theme: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  theme: 'secondary'
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  ...Primary.args,
  theme: 'tertiary'
}
