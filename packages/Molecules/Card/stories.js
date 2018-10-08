import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCardContent from './CardContent.vue'
import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardKeydates from './CardKeydates.vue'
import RplCardEvent from './CardEvent.vue'
import RplCardCta from './CardCta.vue'
import { RplCardCarousel } from './no-ssr'
import readme from './README.md'
import readmeCardContent from './ReadmeCardContent.md'
import { demoData } from '../../../src/storybook-components/_data/demoData.js'

storiesOf('Molecules/Card', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Card Navigation', withReadme(readme, () => ({
    components: { RplCardNavigation },
    template: `<rpl-card-navigation :title="title" :summary="summary" :link="link" />`,
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
    template: `<rpl-card-event :image="image" :dateStart="dateStart" :dateEnd="dateEnd" :location="location" :title="title" :summary="summary" :link="link" :topic="topic" />`,
    data () {
      return demoData.cardEvent()
    }
  })))
  .add('Card Cta', withReadme(readme, () => ({
    components: { RplCardCta },
    template: `<rpl-card-cta :image="image" :title="title" :summary="summary" :link="link" />`,
    data () {
      return demoData.cardCta()
    }
  })))
  .add('Card Content (base)', withReadme(readmeCardContent, () => ({
    components: { RplCardContent },
    template: `<rpl-card-content :link="link" :image="image" :border="border" :type="type">
  <div v-html="content"></div>
</rpl-card-content>`,
    data () {
      return demoData.cardContent()
    }
  })))
  .add('Card Carousel', withReadme(readme, () => ({
    components: { RplCardCarousel },
    template: `<rpl-card-carousel :title="title" :cards="cards" />`,
    data () {
      return demoData.cardCarousel()
    }
  })))
