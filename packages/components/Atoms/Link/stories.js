import { storiesOf } from '@storybook/vue'
import RplLink from './Link.vue'
import RplTextLink from './TextLink.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  boolean,
  select
} from '@storybook/addon-knobs/vue'

storiesOf('Atoms/Link', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Link', () => ({
    components: { RplLink },
    template: '<rpl-link :href="href" :target="target">{{ content }}</rpl-link>',
    props: {
      content: {
        default: text('Content', 'Ripple Link')
      },
      href: {
        default: text('href', '#')
      },
      target: {
        default: text('target', '')
      }
    }
  }))
  .add('Text Link', () => ({
    components: { RplTextLink },
    template: `
      <rpl-text-link
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
      />
    `,
    props: {
      url: {
        default: text('URL', '#')
      },
      text: {
        default: text('Text', 'Text Link')
      },
      theme: {
        default: select('Theme', { light: 'light', dark: 'dark' }, 'light')
      },
      size: {
        default: select('Size', { small: 'small', large: 'large', none: 'none' }, 'small')
      },
      underline: {
        default: boolean('Underline', false)
      },
      emphasis: {
        default: boolean('Emphasis', false)
      },
      iconSymbol: {
        default: text('Icon Symbol', 'arrow_right_primary')
      },
      iconColor: {
        default: text('Icon Color', 'primary')
      },
      iconSize: {
        default: text('Icon Size', 'm')
      },
      iconPlacement: {
        default: select('Icon Placement', { before: 'before', after: 'after' }, 'after')
      }
    }
  }))
