import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplRelatedLinks from './index.vue'
import readme from './README.md'

storiesOf('Organisms/RplRelatedLinks', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Related Links', withReadme(readme, () => ({
    components: { RplRelatedLinks },
    template: `<rpl-related-links :title="title" :links="links" />`,
    data () {
      return {
        title: text('Title', 'Related links'),
        links: object('Links', [
          { text: 'Link to additional content', url: '#' },
          { text: 'Second link it goes right here', url: '#' },
          { text: 'Third link to extra content', url: '#' },
          { text: 'This is a long link to extra content', url: '#' }
        ])
      }
    }
  })))
