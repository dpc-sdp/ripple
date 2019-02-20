import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplCardContent from './CardContent.vue'
import RplCardImageNavigation from './CardImageNavigation.vue'
import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardKeydates from './CardKeydates.vue'
import RplCardEvent from './CardEvent.vue'
import RplCardCta from './CardCta.vue'
import RplCardEmergencyContact from './CardEmergencyContact.vue'
import RplCardBox from './CardBox.vue'
import RplCardHonourRoll from './CardHonourRoll.vue'
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
    template: `<rpl-card-navigation-featured :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :url="url" />`,
    data () {
      return demoData.cardNavigationFeatured()
    }
  })))
  .add('Card Image Navigation', withReadme(readme, () => ({
    components: { RplCardImageNavigation },
    template: `<rpl-card-image-navigation :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :link="link" />`,
    data () {
      return demoData.cardImageNavigation()
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
    template: `<rpl-card-event :image="image" :dateStart="dateStart" :dateEnd="dateEnd" :location="location" :title="title" :summary="summary" :link="link" />`,
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
  .add('Card Emergency Contact', withReadme(readme, () => ({
    components: { RplCardEmergencyContact },
    template: `<rpl-card-emergency-contact :title="title" :subtitle="subtitle" :summary="summary" :link="link" />`,
    data () {
      return demoData.cardEmergencyContact()
    }
  })))
  .add('Card Box', withReadme(readme, () => ({
    components: { RplCardBox },
    template: `<rpl-card-box :cards="cards" />`,
    data () {
      return demoData.cardBox()
    }
  })))
  .add('Card Honour Roll', withReadme(readme, () => ({
    components: { RplCardHonourRoll },
    template: `<rpl-card-honour-roll
  :name="name"
  :inductionYear="inductionYear"
  :category="category"
  :lifespan="lifespan"
  :summary="summary"
  :link="link"
  :image="image"
/>`,
    data () {
      return demoData.cardHonourRoll()
    }
  })))
  .add('Card Content (base)', withReadme(readmeCardContent, () => ({
    components: { RplCardContent },
    template: `<rpl-card-content :link="link" :image="image" :border="border" :type="type" :center="center">
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
