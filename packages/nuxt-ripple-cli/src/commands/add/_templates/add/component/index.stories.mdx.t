---
to: <%= h.changeCase.kebabCase(name) %>/<%= h.prefixedPascalCase(prefix, name) %>.stories.mdx
---
import {
  Canvas,
  Meta,
  Story,
  ArgsTable
} from '@storybook/addon-docs'
import <%= h.prefixedPascalCase(prefix, name) %> from './<%= h.prefixedPascalCase(prefix, name) %>.vue'

export const Template = (args) => ({
  components: { <%= h.prefixedPascalCase(prefix, name) %> },
  setup() {
    return {
      args
    }
  },
  template: `
    <<%= h.prefixedPascalCase(prefix, name) %> v-bind="args" />
  `
})

<Meta
  title='WIP/<%= h.changeCase.pascalCase(name) %>'
  component={<%= h.prefixedPascalCase(prefix, name) %>}
/>

# <%= h.changeCase.pascalCase(name) %>

<ArgsTable of={<%= h.prefixedPascalCase(prefix, name) %>} />

<Canvas>
  <Story
    name='<%= h.changeCase.pascalCase(name) %>'
    args={{
      example: 'Storybook example text'
    }}
  >
    {Template.bind()}
  </Story>
</Canvas>
