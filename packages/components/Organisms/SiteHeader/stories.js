import { storiesOf } from '@storybook/vue'
import RplSiteHeader from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  number,
  object,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/SiteHeader', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Site Header', () => ({
    components: { RplSiteHeader },
    template: `
      <rpl-site-header
        :logo="logo"
        :links="links"
        :breakpoint="breakpoint"
        :searchTerms="searchTerms"
        :sticky="sticky"
        :hideOnScroll="hideOnScroll"
        :showSearch="showSearch"
        :showLogout="showLogout"
        @logout="logoutFunc"
        @search="searchFunc"
      />
    `,
    props: {
      logo: {
        default: () => object('Logo', {
          alt: 'vic.gov.au',
          url: '#',
          image: '/cobrand-logo.png'
        })
      },
      breakpoint: {
        default: number('Menu Breakpoint', 992)
      },
      links: {
        default: () => object('Menu Links', [
          {
            text: 'Your services',
            url: '#',
            children: [
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              { text: 'Sub child A', url: '#' },
              {
                text: 'Sub child B',
                url: '#',
                children: [
                  { text: 'Sub child I', url: '#' },
                  { text: 'Sub child II', url: '#' },
                  { text: 'Sub child III', url: '#' }
                ]
              },
              {
                text: 'Test Path 2',
                url: '#',
                children: [
                  { text: 'Sub child IV', url: '#' },
                  {
                    text: 'Test Path 3',
                    url: '#',
                    children: [
                      { text: 'Sub child X', url: '#' },
                      { text: 'Sub child Y', url: '#' },
                      { text: 'Sub child Z', url: '#' }
                    ]
                  },
                  { text: 'Sub child VI', url: '#' },
                  { text: 'Sub child VII', url: '#' },
                  { text: 'Sub child VIII', url: '#' },
                  { text: 'Sub child IX', url: '#' },
                  { text: 'Sub child X', url: '#' },
                  { text: 'Sub child XI', url: '#' },
                  { text: 'Sub child XII', url: '#' },
                  { text: 'Sub child XIII', url: '#' },
                  { text: 'Sub child IV', url: '#' },
                  { text: 'Sub child V', url: '#' },
                  { text: 'Sub child VI', url: '#' },
                  { text: 'Sub child VII', url: '#' },
                  { text: 'Sub child VIII', url: '#' },
                  { text: 'Sub child IX', url: '#' },
                  { text: 'Sub child X', url: '#' },
                  { text: 'Sub child XI', url: '#' },
                  { text: 'Sub child XII', url: '#' },
                  { text: 'Sub child XIII', url: '#' },
                  { text: 'Sub child IV', url: '#' },
                  { text: 'Sub child V', url: '#' },
                  { text: 'Sub child VI', url: '#' },
                  { text: 'Sub child VII', url: '#' },
                  { text: 'Sub child VIII', url: '#' },
                  { text: 'Sub child IX', url: '#' },
                  { text: 'Sub child X', url: '#' },
                  { text: 'Sub child XI', url: '#' },
                  { text: 'Sub child XII', url: '#' },
                  { text: 'Sub child Last', url: '#' }
                ]
              }
            ]
          },
          { text: 'About VIC Government', url: '#' },
          {
            text: 'News',
            url: '#',
            children: [
              {
                text: 'Sub child 2',
                url: '#',
                children: [
                  { text: 'Sub child 3', url: '#' },
                  { text: 'Sub child 4', url: '#' },
                  { text: 'Sub child 5', url: '#' }
                ]
              }
            ]
          },
          {
            text: 'Events',
            url: '#',
            children: [
              { text: 'Sub child 3', url: '#' },
              { text: 'Sub child 4', url: '#' },
              { text: 'Sub child 5', url: '#' }
            ]
          },
          { text: 'Connect with us', url: '#' }
        ])
      },
      searchTerms: {
        default: () => object('Search Terms', [
          {
            linkText: 'Road works',
            linkUrl: '#'
          },
          {
            linkText: 'School holidays',
            linkUrl: '#'
          }
        ])
      },
      sticky: {
        default: boolean('Sticky', false)
      },
      hideOnScroll: {
        default: boolean('Hide On Scroll', false)
      },
      showSearch: {
        default: boolean('Show search', false)
      },
      showLogout: {
        default: boolean('Show logout', false)
      }
    },
    methods: {
      searchFunc: function (value) {
        alert('Search for: "' + value + '"')
      },
      logoutFunc: function () {
        alert('logout called')
      }
    }
  }))
