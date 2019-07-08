import { storiesOf } from '@storybook/vue'
import RplCampaignSecondary from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/CampaignSecondary', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('With image', () => ({
    components: { RplCampaignSecondary },
    template: `<rpl-campaign-secondary :title="title" :summary="summary" :link="link" :image="image" :video="video" />`,
    props: {
      title: {
        default: text('Title', 'Secondary campaign headline')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: text('Image', 'http://placehold.it/699x411')
      },
      video: {
        default: () => object('Video', null)
      }
    }
  }))
  .add('With video', () => ({
    components: { RplCampaignSecondary },
    template: `<rpl-campaign-secondary :title="title" :summary="summary" :link="link" :image="image" :video="video" />`,
    props: {
      title: {
        default: text('Title', 'Secondary campaign headline')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: text('Image', '')
      },
      video: {
        default: () => object('Video', { src: 'https://www.youtube.com/embed/bSlnfyGTiss', mediaLink: { text: 'View transcript', url: '#' } })
      }
    }
  }))
