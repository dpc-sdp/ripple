import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplNavigationCard from './index.vue'
import readme from './README.md'

storiesOf('Organisms/NavigationCard', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Navigation Card', withReadme(readme, () => ({
    components: { RplNavigationCard },
    template: `<rpl-navigation-card :title="title" :summary="summary" :url="url" />`,
    data () {
      return {
        title: text('Title', 'First navigation card'),
        summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
        url: text('Url', '#')
      }
    }
  })))
