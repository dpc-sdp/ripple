import { storiesOf } from '@storybook/vue'
import RplCampaignPrimary from './index.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs'

storiesOf('Organisms/CampaignPrimary', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplCampaignPrimary },
    template: `<rpl-campaign-primary :title="title" :summary="summary" :link="link" :image="image" :caption="caption" />`,
    props: {
      title: {
        default: text('Title', 'Primary campaign headline')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: () => object('Image', { src: 'http://placehold.it/699x411', alt: '' })
      },
      caption: {
        default: () => text('Caption', 'Image credit: This credit is used to describe the image to the right of the banner.')
      }
    }
  }))
