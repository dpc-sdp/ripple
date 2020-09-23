import { storiesOf } from '@storybook/vue'
import RplCallToAction from './index.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/CallToAction', module)
  .addDecorator(withKnobs)
  .add('Call to Action', () => ({
    components: { RplCallToAction },
    template: `<div class="rpl-content"> <rpl-call-to-action :title="title" :summary="summary" :link="link" :image="image" /></div>`,
    props: {
      title: {
        default: text('Title', 'Card prompting an action')
      },
      summary: {
        default: text('Summary', '<p>Sed ut <b>perspiciatis</b> unde omnis iste natus error sit voluptatem accusantium dolore que laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem.</p>')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: () => object('Image', { src: 'http://placehold.it/336x249', alt: '' })
      }
    }
  }))
  .add('without sidebar', () => ({
    components: { RplCallToAction },
    template: `<div class="rpl-content"> <rpl-call-to-action class="rpl-call-to-action--without-sidebar" :title="title" :summary="summary" :link="link" :image="image" /></div>`,
    props: {
      title: {
        default: text('Title', 'Card prompting an action')
      },
      summary: {
        default: text('Summary', '<p>Sed ut <b>perspiciatis</b> unde omnis iste natus error sit voluptatem accusantium dolore que laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem.</p>')
      },
      link: {
        default: () => object('Call to action', { text: 'Call to action', url: '#' })
      },
      image: {
        default: () => object('Image', { src: 'http://placehold.it/336x249', alt: '' })
      }
    }
  }))
