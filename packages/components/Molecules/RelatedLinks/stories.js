import { storiesOf } from '@storybook/vue'
import RplRelatedLinks from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/RelatedLinks', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplRelatedLinks },
    template: `<rpl-related-links :title="title" :links="links" />`,
    props: {
      title: {
        default: text('Title', 'Related links')
      },
      links: {
        default: object('Links', [
          { text: 'Link to external content', url: 'http://www.google.com' },
          { text: 'Second link it goes right here', url: '#' },
          { text: 'Third link to extra content', url: '#' },
          { text: 'This is a long link to extra content', url: '#' }
        ])
      }
    }
  }))
