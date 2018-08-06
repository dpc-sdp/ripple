import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardKeydates from './CardKeydates.vue'
import RplCardEvent from './CardEvent.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Card', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Card Navigation', withReadme(readme, () => ({
    components: { RplCardNavigation },
    template: `<rpl-card-navigation :title="title" :summary="summary" :url="url" />`,
    data () {
      return demoData.cardNavigation()
    }
  })))
  .add('Card Navigation Featured', withReadme(readme, () => ({
    components: { RplCardNavigationFeatured },
    template: `<rpl-card-navigation-featured :title="title" :summary="summary" :url="url" :image="image" />`,
    data () {
      return demoData.cardNavigationFeatured()
    }
  })))
  .add('Card Promotion', withReadme(readme, () => ({
    components: { RplCardPromotion },
    template: `<rpl-card-promotion :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :link="link" />`,
    data () {
      return demoData.cardPromotion()
    }
  })))
  .add('Card Keydates', withReadme(readme, () => ({
    components: { RplCardKeydates },
    template: `<rpl-card-keydates :title="title" :keydates="keydates" :link="link" />`,
    data () {
      return demoData.cardKeydates()
    }
  })))
  .add('Card Event', withReadme(readme, () => ({
    components: { RplCardEvent },
    template: `<rpl-card-event :image="image" :date="date" :location="location" :title="title" :summary="summary" :link="link" />`,
    data () {
      return demoData.cardEvent()
    }
  })))
