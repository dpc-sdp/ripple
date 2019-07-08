import { storiesOf } from '@storybook/vue'
import RplCampaignPrimary from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/CampaignPrimary', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplCampaignPrimary },
    template: `<rpl-campaign-primary :title="title" :summary="summary" :link="link" :image="image" />`,
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
      }
    }
  }))
