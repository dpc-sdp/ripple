import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/vue'

import RplLink from './Link.vue'
import RplTextLink from './TextLink.vue'
import readme from './README.md'

storiesOf('Atoms/Link', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Link', withReadme(readme, () => ({
    components: { RplLink },
    template: '<rpl-link :href="href" :target="target">{{ content }}</rpl-link>',
    data () {
      return {
        content: text('Content', 'Ripple Link'),
        href: text('href', '#'),
        target: text('target', '')
      }
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
      return {
        url: text('URL', '#'),
        text: text('Text', 'Text Link'),
        theme: select('Theme', {light: 'light', dark: 'dark'}, 'light'),
        size: select('Size', {small: 'small', large: 'large', none: 'none'}, 'small'),
        underline: boolean('Underline', false),
        emphasis: boolean('Emphasis', false),
        iconSymbol: text('Icon Symbol', 'arrow_right_primary'),
        iconColor: text('Icon Color', 'primary'),
        iconSize: text('Icon Size', 'm'),
        iconPlacement: select('Icon Placement', {before: 'before', after: 'after'}, 'after')
      }
    }
  })))
