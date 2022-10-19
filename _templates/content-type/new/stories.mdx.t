---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/<%= h.changeCase.paramCase(name) %>.stories.mdx
---

import {
  Canvas,
  Meta,
  Story
} from '@storybook/addon-docs'

// import fixture from '../../../examples/nuxt-app/test/fixtures/<%= h.changeCase.paramCase(name) %>/url-of-reference-node.json'
import MockPage from '../../ripple-ui-core/stories/components/mock-page.vue'
import Tide<%= h.changeCase.pascalCase(name) %>Page from './index.vue'

export const <%= h.changeCase.pascalCase(name) %>Template = (args) => ({
  components: {
    MockPage
  },
  setup() {
    return { args }
  },
  template: `<MockPage v-bind="args"></MockPage>`
})

<Meta
  title='<%= h.changeCase.sentenceCase(name) %>/Template'
  component={Tide<%= h.changeCase.pascalCase(name) %>Page}
  argTypes={{
    componentName: { table: { disable: true } },
    pageComponent: { table: { disable: true } },
    aboveHeader: { table: { disable: true } },
    primaryNav: { table: { disable: true } },
    sidebar: { table: { disable: true } },
    footer: { table: { disable: true } },
    default: { table: { disable: true } }
  }}
  args={{
    componentName: 'Tide<%= h.changeCase.pascalCase(name) %>',
    pageComponent: Tide<%= h.changeCase.pascalCase(name) %>Page,
    url: 'https://www.vic.gov.au',
    breadcrumbs: {
      items: [
        { label: 'Home', url: '/' },
        { label: '<%= h.changeCase.sentenceCase(name) %>', url: '/<%= h.changeCase.paramCase(name) %>' }
      ]
    },
    site: {},
    page: fixture
  }}
  parameters={{
    layout: 'fullscreen'
  }}
/>

# <%= h.changeCase.sentenceCase(name) %>

<Canvas>
  <Story name='Template'>
    {<%= h.changeCase.pascalCase(name) %>Template.bind()}
  </Story>
</Canvas>
