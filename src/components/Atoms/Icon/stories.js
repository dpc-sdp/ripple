import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'

import SIcons from '../../../storybook-components/Icons.vue'
import readme from './README.md'

storiesOf('Atoms/Icon', module)
  .add('Icon', withReadme(readme, () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" />',
    data () {
      return {
        icons: [
          'down',
          'hamburger',
          'right',
          'search'
        ]
      }
    }
  })))
