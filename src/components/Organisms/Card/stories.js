import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import readme from './README.md'

storiesOf('Organisms/Card', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Card Navigation', withReadme(readme, () => ({
    components: { RplCardNavigation },
    template: `<rpl-card-navigation :title="title" :summary="summary" :url="url" />`,
    data () {
      return {
        title: text('Title', 'First navigation card'),
        summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
        url: text('Url', '#')
      }
    }
  })))
  .add('Card Navigation Featured', withReadme(readme, () => ({
    components: { RplCardNavigationFeatured },
    template: `<rpl-card-navigation-featured :title="title" :summary="summary" :url="url" :image="image" />`,
    data () {
      return {
        title: text('Title', 'This is display copy that wraps 2 lines'),
        summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
        url: text('Url', '#'),
        image: text('Image', 'https://placehold.it/818x497')
      }
    }
  })))
