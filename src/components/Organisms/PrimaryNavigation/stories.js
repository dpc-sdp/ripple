import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplPrimaryNavigation from './index.vue'
import readme from './README.md'

storiesOf('Organisms/PrimaryNavigation', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Primary Navigation', withReadme(readme, () => ({
    components: { RplPrimaryNavigation },
    template: '<rpl-primary-navigation :siteName="siteName"/>',
    data () {
      return {
        siteName: text('site name', 'vic.gov.au')
      }
    }
  })))
