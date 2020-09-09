import { storiesOf } from '@storybook/vue'
import RplButton from '@dpc-sdp/ripple-button'

import {
  withKnobs,
  text,
  boolean,
  select
} from '@storybook/addon-knobs'

const template = `<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>`

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('Primary', () => ({
    components: { RplButton },
    template,
    props: {
      content: {
        default: text('Content', 'Primary button')
      },
      href: {
        default: text('href', '#')
      },
      theme: {
        default: select('Theme', { primary: 'primary', secondary: 'secondary' }, 'primary')
      },
      disabled: {
        default: boolean('Disabled', false)
      }
    }
  }))
  .add('Secondary', () => ({
    components: { RplButton },
    template,
    props: {
      content: {
        default: text('Content', 'Secondary button')
      },
      href: {
        default: text('href', '#')
      },
      theme: {
        default: select('Theme', { primary: 'primary', secondary: 'secondary' }, 'secondary')
      },
      disabled: {
        default: boolean('Disabled', false)
      }
    }
  }))
  .add('Disabled', () => ({
    components: { RplButton },
    template,
    props: {
      content: {
        default: text('Content', 'Disabled button')
      },
      href: {
        default: text('href', '#')
      },
      theme: {
        default: select('Theme', { primary: 'primary', secondary: 'secondary' }, 'secondary')
      },
      disabled: {
        default: boolean('Disabled', true)
      }
    }
  }))
  .add('without href', () => ({
    components: { RplButton },
    template,
    props: {
      content: {
        default: text('Content', 'Button with href')
      },
      href: {
        default: text('href', '')
      },
      theme: {
        default: select('Theme', { primary: 'primary', secondary: 'secondary' }, 'primary')
      },
      disabled: {
        default: boolean('Disabled', false)
      }
    }
  }))
