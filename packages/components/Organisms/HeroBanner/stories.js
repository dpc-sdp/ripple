import { storiesOf } from '@storybook/vue'
import RplHeroBanner from './HeroBanner.vue'
import RplHeroBannerCta from './HeroBannerCta.vue'
import RplIntroBanner from './IntroBanner.vue'

import {
  withKnobs,
  text,
  select,
  object,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/HeroBanner', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplHeroBanner },
    template: `
      <rpl-hero-banner
        :title="title" :introText="introText"
        :linkHeading="linkHeading" :links="links"
        :moreLink="moreLink"
        :theme="theme"
        :showLinks="showLinks"
        :logo="logo"
        :backgroundGraphic="backgroundGraphic"
        class="rpl-site-constrain--on-all"
      />
    `,
    props: {
      title: {
        default: text('Title', 'This is display copy that wraps 2 lines')
      },
      introText: {
        default: text('Intro Text', 'This is supplementary intro text that can also wrap over a couple of lines.')
      },
      linkHeading: {
        default: text('Link Heading', 'Want to know more about...')
      },
      links: {
        default: () => object('Links', [
          { text: 'First journey based link', url: '#' },
          { text: 'Secondary journey based link', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Fourth journey based link', url: '#' }
        ])
      },
      moreLink: {
        default: () => object('More Link', { text: 'See more', url: '#' })
      },
      theme: {
        default: select('Theme', { dark: 'dark', light: 'light' }, 'light')
      },
      showLinks: {
        default: boolean('Show Links', true)
      },
      logo: {
        default: text('Logo', '/herologo.png')
      },
      backgroundGraphic: {
        default: text('Background Graphic', '/bggraphiclower.png')
      }
    }
  }))
  .add('with CTA', () => ({
    components: { RplHeroBannerCta },
    template: `
      <rpl-hero-banner-cta
        :title="title"
        :introText="introText"
        :theme="theme"
        :linkPrimary="linkPrimary"
        :ctaText="ctaText"
        :linkSecondary="linkSecondary"
      />
    `,
    props: {
      title: {
        default: text('Title', 'This is display copy that wraps 2 lines')
      },
      introText: {
        default: text('Intro Text', 'This is supplementary intro text that can also wrap over a couple of lines.')
      },
      theme: {
        default: select('Theme', { dark: 'dark', light: 'light' }, 'light')
      },
      linkPrimary: {
        default: () => object('linkPrimary', { text: 'Call to action', url: '#' })
      },
      linkSecondary: {
        default: () => object('linkSecondary', { text: 'Subscribe for tips to prepare', url: '#' })
      },
      ctaText: {
        default: text('ctaText', 'Not ready yet?')
      }
    }
  }))
  .add('Intro Banner', () => ({
    components: { RplIntroBanner },
    template: `
      <rpl-intro-banner
        :title="title" :introText="introText"
        :linkHeading="linkHeading" :links="links"
        :showLinks="showLinks"
        class="rpl-site-constrain--on-all"
      />
    `,
    props: {
      title: {
        default: text('Title', 'Welcome to Victoria Police Museum')
      },
      introText: {
        default: text('Intro Text', 'From the largest collection of Kelly Gang armour in Australia to forensic evidence from some of Melbourne\'s most notorious crimes, the Victoria Police Museum presents visitors with an intriguing insight into the social history of policing and crime.')
      },
      linkHeading: {
        default: text('Link Heading', '')
      },
      links: {
        default: () => object('Links', [
          { text: 'Plan your visit', url: '#' },
          { text: 'Collections', url: '#' },
          { text: 'School Programs', url: '#' },
          { text: 'Group Bookings', url: '#' }
        ])
      },
      showLinks: {
        default: boolean('Show Links', true)
      }
    }
  }))
