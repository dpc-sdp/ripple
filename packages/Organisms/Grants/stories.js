import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplGrantsOverview from './GrantsOverview.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/Grants', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Grants Overview', withReadme(readme, () => ({
    components: { RplGrantsOverview },
    template: `<rpl-grants-overview :title="title" :funding="funding" :audience="audience" :startdate="startdate" :enddate="enddate" :description="description" :link="link" />`,
    data () {
      return demoData.grantsOverview()
    }
  })))
