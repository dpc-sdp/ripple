import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplWhatsNext from './index.vue'
import readme from './README.md'

storiesOf('Molecules/WhatsNext', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('What\'s Next', withReadme(readme, () => ({
    components: { RplWhatsNext },
    template: `<rpl-whats-next :title="title" :links="links" />`,
    data () {
      return {
        title: text('Title', 'What\'s next?'),
        links: object('Links', [
          { text: 'Link to additional content', url: '#' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Link to additional content', url: '#' },
          { text: 'Second link to extra content', url: '#' },
          { text: 'This is another link', url: '#' }
        ])
      }
    }
  })))
