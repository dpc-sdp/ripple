import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplAnchorLinks from './index.vue'
import readme from './README.md'

storiesOf('Molecules/AnchorLinks', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Anchor Links', withReadme(readme, () => ({
    components: { RplAnchorLinks },
    template: `<rpl-anchor-links :title="title" :links="links" />`,
    data () {
      return {
        title: text('Title', 'On this page'),
        links: object('Links', [
          { text: 'This is the first anchor link', url: '#' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Link to additional content', url: '#' },
          { text: 'Another link to extra content', url: '#' },
          { text: 'This is another link', url: '#' }
        ])
      }
    }
  })))
