import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCallToAction from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/CallToAction', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Call to Action', withReadme(readme, () => ({
    components: { RplCallToAction },
    template: `<rpl-call-to-action :title="title" :summary="summary" :link="link" :image="image" />`,
    data () {
      return demoData.callToAction()
    }
  })))
