import { storiesOf } from '@storybook/vue'

import SPage from './Page.vue'
import SCampaignPage from './CampaignPage.vue'
import SSearchPage from './SearchPage.vue'
import SEventSearchPage from './EventSearchPage.vue'
import SGrantSearchPage from './GrantSearchPage.vue'
import SPageHeroGraphics from './PageHeroGraphics.vue'
import SPageCardTrim from './PageCardTrim.vue'
import SPageSitemap from './PageSitemap.vue'
import SPageForm from './PageForm.vue'
import SPageProfile from './PageProfile.vue'
import SPageAccordion from './PageAccordion.vue'
import SPagePublication from './PagePublication.vue'
import SPageCards from './PageCards.vue'
import SPrintPage from './PrintPage.vue'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs'

import { demoDataLocked } from './_data/demoData.js'

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Landing page demo', () => ({
    components: { SPage },
    template: `<s-page :sidebar="sidebar" :preview="preview" :quickExit="quickExit" :mock="mock"></s-page>`,
    data () {
      return {
        sidebar: boolean('Sidebar', true),
        preview: boolean('Preview', true),
        quickExit: boolean('Quick Exit', true),
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .add('Campaign page demo', () => ({
    components: { SCampaignPage },
    template: `<s-campaign-page :sidebar="sidebar" :mock="mock"></s-campaign-page>`,
    data () {
      return {
        sidebar: true,
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Search page demo', () => ({
    components: { SSearchPage },
    template: `<s-search-page
:sidebar="sidebar"
:mock="mock"
:hasError="hasError"
:noResults="noResults"
>
</s-search-page>`,
    data () {
      return {
        sidebar: boolean('Has sidebar', false),
        mock: demoDataLocked,
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Event search page demo', () => ({
    components: { SEventSearchPage },
    template: `<s-event-search-page
:sidebar="sidebar"
:mock="mock"
:hasError="hasError"
:noResults="noResults"
>
</s-event-search-page>`,
    data () {
      return {
        sidebar: boolean('Has sidebar', false),
        mock: demoDataLocked,
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
      }
    }
  }))
storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Grant search page demo', () => ({
    components: { SGrantSearchPage },
    template: `<s-grant-search-page
    :sidebar="sidebar"
    :mock="mock"
    :hasError="hasError"
    :noResults="noResults"
    >
    </s-grant-search-page>`,
    data () {
      return {
        sidebar: boolean('Has sidebar', false),
        mock: demoDataLocked,
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Landing page with hero banner graphics', () => ({
    components: { SPageHeroGraphics },
    template: `<s-page-hero-graphics :sidebar="sidebar" :showHeroLogo="showHeroLogo" :showTopGraphic="showTopGraphic" :showBottomGraphic="showBottomGraphic" :showBreadcrumbs="showBreadcrumbs" :showQuickExit="showQuickExit" :mock="mock" />`,
    data () {
      return {
        sidebar: boolean('Show Sidebar', true),
        showHeroLogo: boolean('Show Hero Banner Logo', false),
        showTopGraphic: boolean('Show Top Graphic', true),
        showBottomGraphic: boolean('Show Bottom Graphic', true),
        showBreadcrumbs: boolean('Show Breadcrumbs', true),
        showQuickExit: boolean('Show Quick Exit', true),
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page with trim cards', () => ({
    components: { SPageCardTrim },
    template: `<s-page-card-trim :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page with sitemap', () => ({
    components: { SPageSitemap },
    template: `<s-page-sitemap :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page with form', () => ({
    components: { SPageForm },
    template: `<s-page-form :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Profile Page', () => ({
    components: { SPageProfile },
    template: `<s-page-profile :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Accordion Page', () => ({
    components: { SPageAccordion },
    template: `<s-page-accordion :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Publication Page', () => ({
    components: { SPagePublication },
    template: `<s-page-publication :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Page with Cards', () => ({
    components: { SPageCards },
    template: `<s-page-cards :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))

storiesOf('Templates', module)
  .addDecorator(withKnobs)
  .add('Print Page', () => ({
    components: { SPrintPage },
    template: `<s-print-page :mock="mock" />`,
    data () {
      return {
        mock: demoDataLocked
      }
    }
  }))
