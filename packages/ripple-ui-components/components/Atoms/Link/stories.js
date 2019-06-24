import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplLink from './Link.vue'
import RplTextLink from './TextLink.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Link', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Link', withReadme(readme, () => ({
    components: { RplLink },
    template: '<rpl-link :href="href" :target="target">{{ content }}</rpl-link>',
    data () {
      return demoData.link()
    }
  })))
  .add('Text Link', withReadme(readme, () => ({
    components: { RplTextLink },
    template: `<rpl-text-link
  :url="url"
  :text="text"
  :iconSymbol="iconSymbol"
  :iconColor="iconColor"
  :iconPlacement="iconPlacement"
  :iconSize="iconSize"
  :underline="underline"
  :theme="theme"
  :size="size"
  :emphasis="emphasis"
/>`,
    data () {
      return demoData.textLink()
    }
  })))
