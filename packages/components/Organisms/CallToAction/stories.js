import { storiesOf } from '@storybook/vue'
import RplCallToAction from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/CallToAction', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Call to Action', () => ({
    components: { RplCallToAction },
    template: `<rpl-call-to-action :title="title" :summary="summary" :link="link" :image="image" />`,
    props: {
      title: {
        default: text('Title', 'Card prompting an action')
      },
      summary: {
        default: text('Summary', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore que laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: () => object('Image', { src: 'http://placehold.it/336x249', alt: '' })
      }
    }
  }))
