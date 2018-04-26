import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'

import SColors from '../../../storybook-components/Colors.vue'
import STypography from '../../../storybook-components/Typography.vue'
import readme from './README.md'

storiesOf('Atoms/Global', module)
  .add('Colors', withReadme(readme, () => ({
    components: { SColors },
    template: '<s-colors :colors="colors"/>',
    data () {
      return {
        colors: [
          'primary',
          'dark_primary',
          'secondary',
          'extra_dark_neutral',
          'dark_neutral',
          'mid_neutral',
          'light_neutral',
          'error_emergency'
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
          'display_xl',
          'display_l',
          'heading_xl',
          'heading_l',
          'heading_m',
          'heading_s',
          'heading_xs',
          'body_default',
          'body_small',
          'copy_extra_small'
        ]
      }
    }
  })))
