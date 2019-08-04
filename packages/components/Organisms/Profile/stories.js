import { storiesOf } from '@storybook/vue'
import RplProfileHighlight from './ProfileHighlight.vue'
import RplProfileHighlightHonourRoll from './ProfileHighlightHonourRoll.vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Profile', module)
  .addDecorator(withKnobs)
  .add('Profile Highlight', () => ({
    components: { RplProfileHighlight },
    template: `
    <rpl-profile-highlight :image="image">
      <template slot="details">
        <div v-html="content"></div>
      </template>
    </rpl-profile-highlight>
    `,
    props: {
      image: {
        default: text('Image', 'http://placehold.it/156x156')
      },
      content: {
        default: text('Content', '<p>HTML Content</p>')
      }
    }
  }))
  .add('Profile Highlight Honour Roll', () => ({
    components: { RplProfileHighlightHonourRoll },
    template: `<rpl-profile-highlight-honour-roll :image="image" :inductedYear="inductedYear" :category="category"/>`,
    props: {
      image: {
        default: text('Image', 'http://placehold.it/156x156')
      },
      inductedYear: {
        default: text('Inducted Year', '2018')
      },
      category: {
        default: text('Category', 'Local Champion')
      }
    }
  }))
