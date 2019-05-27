import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplDescriptionList from './DescriptionList.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/DescriptionList', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Description List', withReadme(readme, () => ({
    components: { RplDescriptionList },
    template: `<rpl-description-list :list="list" />`,
    data () {
      return demoData.descriptionList()
    }
  })))
