import { storiesOf } from '@storybook/vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs'

import RplResponsiveImg from './ResponsiveImg.vue'

storiesOf('Atoms/ResponsiveImg', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplResponsiveImg },
    template: `<rpl-responsive-img :src="src" :focalPoint="focalPoint" :srcSet="srcSet" :sizes="sizes"  />`,
    created () {
      // This is just for demo purpose.
      // You should set it in Ripple global plugins.
      this.rplOptions.imgQueryString = (bp) => {
        return `?w=${bp.width}&h=${bp.height}`
      }
    },
    destroyed () {
      // This is just for demo purpose.
      // You should set it in Ripple global plugins.
      this.rplOptions.imgQueryString = false
    },
    props: {
      src: {
        default: text('Image src', 'https://images.unsplash.com/photo-1591302418462-eb55463b49d6')
      },
      focalPoint: {
        default: text('Focal point', '50% 50%')
      },
      srcSet: {
        default: () => object('source sizes', [
          { size: 'xs', height: 300, width: 575 },
          { size: 's', height: 600, width: 768 },
          { size: 'm', height: 600, width: 992 },
          { size: 'xxl', height: 600, width: 1600 }
        ])
      },
      sizes: {
        default: text('sizes', '100vw')
      }
    }
  }))
