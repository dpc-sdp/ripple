import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import readme from './README.md'

import SPage from './Page.vue'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page demo', withReadme(readme, () => ({
    components: { SPage },
    template: `<s-page :sidebar="sidebar"></s-page>`,
    data () {
      return {
        sidebar: boolean('Sidebar', true)
      }
    }
  })))
