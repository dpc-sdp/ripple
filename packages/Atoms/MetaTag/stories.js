import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  select
} from '@storybook/addon-knobs/vue'

import RplMetaTag from './index.vue'
import readme from './README.md'

storiesOf('Atoms/MetaTag', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Meta Tag', withReadme(readme, () => ({
    components: { RplMetaTag },
    template: '<rpl-meta-tag :linkText="linkText" :linkUrl="linkUrl" :theme="theme" />',
    data () {
      return {
        linkText: text('Text', 'Meta Tag'),
        linkUrl: text('Link', '#'),
        theme: select('Theme', {light: 'light', dark: 'dark'}, 'light')
      }
    }
  })))
