import { storiesOf } from '@storybook/vue'
import RplMetaTag from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  select
} from '@storybook/addon-knobs/vue'

storiesOf('Atoms/MetaTag', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Meta Tag', () => ({
    components: { RplMetaTag },
    template: '<rpl-meta-tag :linkText="linkText" :linkUrl="linkUrl" :theme="theme" />',
    props: {
      linkText: {
        default: text('Content', 'Metatag')
      },
      linkUrl: {
        default: text('href', '#')
      },
      theme: {
        default: select('Theme', { light: 'light', dark: 'dark' }, 'light')
      }
    }
  }))
