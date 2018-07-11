import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardKeydates from './CardKeydates.vue'
import RplCardEvent from './CardEvent.vue'
import readme from './README.md'

storiesOf('Molecules/Card', module)
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
  .add('Card Promotion', withReadme(readme, () => ({
    components: { RplCardPromotion },
    template: `<rpl-card-promotion :image="image" :date="date" :tags="tags" :title="title" :summary="summary" :link="link" />`,
    data () {
      return {
        image: text('Image', 'https://placehold.it/580x340'),
        date: text('Date', '2018-07-10T09:00:00.000+10:00'),
        topic: text('Topic', 'News'),
        title: text('Title', 'This is display copy that wraps 2 lines'),
        summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
        link: object('Link', { text: 'Read more', url: '#' })
      }
    }
  })))
  .add('Card Keydates', withReadme(readme, () => ({
    components: { RplCardKeydates },
    template: `<rpl-card-keydates :title="title" :keydates="keydates" :link="link" />`,
    data () {
      return {
        title: text('Title', 'Key calendar dates'),
        keydates: object('Keydates', [
          { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
          { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
        ]),
        link: object('Link', { text: 'See the events calendar', url: '#' })
      }
    }
  })))
  .add('Card Event', withReadme(readme, () => ({
    components: { RplCardEvent },
    template: `<rpl-card-event :image="image" :date="date" :location="location" :title="title" :summary="summary" :link="link" />`,
    data () {
      return {
        image: text('Image', 'https://placehold.it/580x340'),
        date: text('Date', '2018-07-10T09:00:00.000+10:00'),
        location: text('Location', 'South Yarra'),
        title: text('Title', 'This is the headline of an event with a location that will stretch over over 3 lines'),
        summary: text('Summary', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte'),
        link: object('Link', { text: 'See event details', url: '#' })
      }
    }
  })))
