import { storiesOf } from '@storybook/vue'
import RplFigure from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Figure', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplFigure },
    template: `<rpl-figure :image="image" :caption="caption" />`,
    props: {
      image: {
        default: object('Image', {
          src: 'https://placehold.it/800x400',
          alt: 'A generic square placeholder image.'
        })
      },
      caption: {
        default: text('Caption', '1.2 Caption to go here. This should be restricted in characters.')
      }
    }
  }))
