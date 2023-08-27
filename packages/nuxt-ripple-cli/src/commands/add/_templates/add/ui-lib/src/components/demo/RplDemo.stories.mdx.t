---
to: src/components/demo/RplDemo.stories.mdx
---
import {
  Canvas,
  Meta,
  Story,
  ArgsTable
} from '@storybook/addon-docs'
import RplDemo from './RplDemo.vue'

export const Template = (args) => ({
  components: { RplDemo },
  setup() {
    return {
      args
    }
  },
  template: `
    <RplDemo
      v-bind="args"
    />
  `
})

<Meta
  title='Core/Containers/Demo'
  component={RplDemo}
/>

# Demo

<ArgsTable of={RplDemo} />

<Canvas>
  <Story
    name='Demo'
    args={{
      id: 'example'
    }}
  >
    {Template.bind()}
  </Story>
</Canvas>
