import { storiesOf } from '@storybook/vue'
import RplShareThis from './index.vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/ShareThis', module)
  .addDecorator(withKnobs)
  .add('Share this', () => ({
    components: { RplShareThis },
    template: `
      <rpl-share-this
        :title="title"
        :url="url"
      />
    `,
    props: {
      title: {
        default: text('Title', 'Share this')
      },
      url: {
        default: text('Url', 'https://app-vic-gov-au-develop.lagoon.vicsdp.amazee.io/')
      }
    }
  }))
