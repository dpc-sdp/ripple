import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'

import SColors from '../../../storybook-components/Colors.vue'
import STypography from '../../../storybook-components/Typography.vue'
import SBreakpoints from '../../../storybook-components/Breakpoints.vue'
import readme from './README.md'

storiesOf('Atoms/Global', module)
  .add('Colors', withReadme(readme, () => ({
    components: { SColors },
    template: '<s-colors :colors="colors" :gradients="gradients"/>',
    data () {
      return {
        colors: [
          'primary',
          'dark_primary',
          'secondary',
          'extra_dark_neutral',
          'dark_neutral',
          'mid_neutral_1',
          'mid_neutral_2',
          'light_neutral',
          'danger',
          'warning',
          'success',
          'white'
        ],
        gradients: [
          'primary_gradient'
        ]
      }
    }
  })))
  .add('Typography', withReadme(readme, () => ({
    components: { STypography },
    template: '<s-typography :samples="samples"/>',
    data () {
      return {
        samples: [
          'display_l',
          'display_m',
          'display_s',
          'supporting_l',
          'supporting_m',
          'supporting_s',
          'heading_l',
          'heading_m',
          'heading_s',
          'heading_xs',
          'body_large',
          'body_default',
          'body_small',
          'copy_extra_small'
        ]
      }
    }
  })))
  .add('Breakpoints', withReadme(readme, () => ({
    components: { SBreakpoints },
    template: '<s-breakpoints :breakpoints="breakpoints"/>',
    data () {
      return {
        breakpoints: [
          'xs',
          's',
          'm',
          'l',
          'xl',
          'xxl',
          'xxxl'
        ]
      }
    }
  })))
