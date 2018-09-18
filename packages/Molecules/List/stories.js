import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplList from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/List', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('List', withReadme(readme, () => ({
    components: { RplList },
    template: `<rpl-list :title="title" :size="size" :iconScale="iconScale" :iconColor="iconColor" :list="list" />`,
    data () {
      return demoData.list()
    }
  })))
