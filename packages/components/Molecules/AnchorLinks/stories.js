import { storiesOf } from '@storybook/vue'
import RplAnchorLinks from './index.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/AnchorLinks', module)
  .addDecorator(withKnobs)
  .add('Anchor Links', () => ({
    components: { RplAnchorLinks },
    template: `<rpl-anchor-links :title="title" :links="links" />`,
    props: {
      title: {
        default: text('Title', 'On this page:')
      },
      links: {
        default: () => object('Links', [
          { text: 'This is the first anchor link', url: '#', type: 'h2' },
          { text: 'This is sub heading following first anchor link', url: '#', type: 'h3' },
          { text: 'Second link to extra content', url: '#', type: 'h2' },
          { text: 'Third link goes here', url: '#', type: 'h2' },
          { text: 'Link to additional content', url: '#', type: 'h2' },
          { text: 'Another link to extra content', url: '#', type: 'h2' },
          { text: 'This is another sub heading', url: '#', type: 'h3' },
          { text: 'And another sub heading', url: '#', type: 'h3' },
          { text: 'This is another link', url: '#', type: 'h2' }
        ])
      }
    }
  }))
