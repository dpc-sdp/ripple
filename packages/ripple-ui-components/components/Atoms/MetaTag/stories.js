import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplMetaTag from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/MetaTag', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Meta Tag', withReadme(readme, () => ({
    components: { RplMetaTag },
    template: '<rpl-meta-tag :linkText="linkText" :linkUrl="linkUrl" :theme="theme" />',
    data () {
      return demoData.metaTag()
    }
  })))
