import { storiesOf } from '@storybook/vue'
import RplAnchorLinks from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/AnchorLinks', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Anchor Links', () => ({
    components: { RplAnchorLinks },
    template: `<rpl-anchor-links :title="title" :links="links" />`,
    props: {
      title: {
        default: text('Title', 'On this page:')
      },
      links: {
        default: () => object('Links', [
          { text: 'This is the first anchor link', url: '#' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Link to additional content', url: '#' },
          { text: 'Another link to extra content', url: '#' },
          { text: 'This is another link', url: '#' }
        ])
      }
    }
  }))
