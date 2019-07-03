import { storiesOf } from '@storybook/vue'
import RplWhatsNext from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/WhatsNext', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplWhatsNext },
    template: `<rpl-whats-next :title="title" :links="links" />`,
    props: {
      title: {
        default: text('Title', 'What\'s next?')
      },
      links: {
        default: object('Links', [
          { text: 'Link to external content', url: 'http://www.google.com' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Link to additional content', url: '#' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'This is another link', url: '#' }
        ])
      }
    }
  }))
