import { storiesOf } from '@storybook/vue'
import RplButton from '@dpc-sdp/ripple-button'
import readme from './README.md'

import {
  withKnobs,
  text,
  boolean,
  select
} from '@storybook/addon-knobs/vue'

const template = `<rpl-button :href="href" :theme="theme" :disabled="disabled">{{ content }}</rpl-button>`

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('default', () => ({
    components: { RplButton },
    template,
    props: {
      content: {
        default: text('Content', 'Ripple Button')
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
  .add('with href', () => ({
    components: { RplButton },
    template,
    data () {
      return {
        content: 'Ripple Button',
        href: '#',
        theme: 'primary',
        disabled: false
      }
    }
  }))
  .add('without href', () => ({
    components: { RplButton },
    template,
    data () {
      return {
        content: 'Ripple Button',
        href: false,
        theme: 'primary',
        disabled: false
      }
    }
  }))
  .add('secondary theme', () => ({
    components: { RplButton },
    template,
    data () {
      return {
        content: 'Ripple Button',
        href: '#',
        theme: 'secondary',
        disabled: false
      }
    }
  }))
  .add('disabled', () => ({
    components: { RplButton },
    template,
    data () {
      return {
        content: 'Ripple Button',
        href: '#',
        theme: 'primary',
        disabled: true
      }
    }
  }))
