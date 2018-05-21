import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  object,
  number,
  boolean
} from '@storybook/addon-knobs/vue'

import RplSiteHeader from './index.vue'
import readme from './README.md'

storiesOf('Organisms/SiteHeader', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Site Header', withReadme(readme, () => ({
    components: { RplSiteHeader },
    template: `<rpl-site-header
  :logo="logo"
  :links="links"
  :breakpoint="breakpoint"
  :searchTerms="searchTerms"
  :sticky="sticky"
  @open="menuOpenFunc"
  @search="searchFunc"
/>`,
    data () {
      return {
        logo: object('Logo', {
          alt: 'vic.gov.au',
          url: '#',
          image: 'data:image/svg+xml,<svg width="92" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M4.765 10.761L0 .24h3.177l2.647 5.738L8.47.239h3.177L6.883 10.76H4.765zm7.928 0V.24h2.842V10.76h-2.842zM22.46 0c1.992 0 3.79.884 4.876 2.483l-2.368 1.46c-.53-.73-1.282-1.221-2.37-1.221-1.448 0-2.702 1.333-2.702 2.778s1.254 2.778 2.703 2.778c1.087 0 1.84-.491 2.369-1.22l2.368 1.459C26.25 10.117 24.452 11 22.46 11c-2.954 0-5.601-2.371-5.601-5.5s2.647-5.5 5.6-5.5zm7.189 10.874a1.355 1.355 0 0 1 0-2.708 1.36 1.36 0 0 1 1.365 1.36c0 .744-.613 1.348-1.365 1.348zm8.778-4.111V4.32h4.737v4.196C42.077 10.117 40.28 11 38.287 11c-2.954 0-5.6-2.371-5.6-5.5s2.646-5.5 5.6-5.5c1.714 0 3.274.66 4.375 1.852L40.53 3.634c-.501-.547-1.184-.912-2.103-.912-1.45 0-2.703 1.333-2.703 2.778s1.254 2.778 2.703 2.778c.822 0 1.476-.21 1.978-.631v-.884h-1.978zM56.079 5.5c0 3.129-2.689 5.5-5.796 5.5s-5.796-2.371-5.796-5.5S47.177 0 50.283 0c3.107 0 5.796 2.371 5.796 5.5zm-8.554 0c0 1.53 1.24 2.778 2.758 2.778 1.519 0 2.759-1.249 2.759-2.778 0-1.53-1.24-2.778-2.759-2.778-1.518 0-2.758 1.249-2.758 2.778zm14.016 5.261L56.776.24h3.177L62.6 5.977 65.247.239h3.177L63.659 10.76H61.54zm6.927.113a1.355 1.355 0 0 1 0-2.708 1.36 1.36 0 0 1 1.365 1.36c0 .744-.613 1.348-1.365 1.348zM77.218.239l4.834 10.522h-3.093l-.53-1.206h-3.622l-.53 1.206h-3.093L76.02.24h1.198zm-1.505 7h1.81l-.835-2.272h-.14l-.835 2.273zM92 .24v6.538C92 9.527 90.286 11 87.514 11c-2.745 0-4.459-1.473-4.459-4.223V.239h2.898v6.664c0 .968.6 1.586 1.56 1.586.962 0 1.575-.618 1.575-1.586V.24H92z" fill="#FFF" fill-rule="evenodd"/></svg>'
        }),
        breakpoint: number('Menu Breakpoint', 992),
        links: object('Menu Links', [
          {
            text: 'Your services',
            url: '#',
            children: [
              { text: 'Sub child A', href: '#' },
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
        ]),
        searchTerms: object('Search Terms', [
          {
            linkText: 'Road works',
            linkUrl: '#'
          },
          {
            linkText: 'School holidays',
            linkUrl: '#'
          }
        ]),
        sticky: boolean('Sticky', false)
      }
    },
    methods: {
      searchFunc: function (value) {
        alert('Search for: "' + value + '"')
      },
      menuOpenFunc: function (menuOpenState) {
        document.body.style.overflow = menuOpenState ? 'hidden' : ''
      }
    }
  })))
