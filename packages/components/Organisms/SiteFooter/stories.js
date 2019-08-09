import { storiesOf } from '@storybook/vue'
import RplSiteFooter from './SiteFooter.vue'

import {
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/SiteFooter', module)
  .add('Site footer', () => ({
    components: { RplSiteFooter },
    template: `
      <rpl-site-footer
        :nav="nav"
        :links="links"
        :copyright="copyright"
        :acknowledgement="acknowledgement"
        :logos="logos"
      />
    `,
    data () {
      return {
        nav: object('Nav', [
          {
            text: 'Your Services',
            url: '#',
            children: [
              {
                text: 'Grants awards and assistance',
                url: '#'
              },
              {
                text: 'Law and safety',
                url: '#'
              },
              {
                text: 'Business and Industry',
                url: '#'
              },
              {
                text: 'Jobs and the Workplace',
                url: '#'
              },
              {
                text: 'Transport and Traffic',
                url: '#'
              },
              {
                text: 'Education',
                url: '#'
              },
              {
                text: 'Housing and Property',
                url: '#'
              },
              {
                text: 'Health',
                url: '#'
              },
              {
                text: 'Community',
                url: '#'
              },
              {
                text: 'Art, Culture and Sport',
                url: '#'
              },
              {
                text: 'Environment and Water',
                url: '#'
              }
            ]
          },
          {
            text: 'About VIC Government',
            url: '#',
            children: [
              {
                text: 'Grants awards and assistance',
                url: '#'
              },
              {
                text: 'Law and safety',
                url: '#'
              },
              {
                text: 'Business and Industry',
                url: '#'
              },
              {
                text: 'Jobs and the Workplace',
                url: '#'
              },
              {
                text: 'Transport and Traffic',
                url: '#'
              },
              {
                text: 'Education',
                url: '#'
              },
              {
                text: 'Housing and Property',
                url: '#'
              },
              {
                text: 'Health',
                url: '#'
              },
              {
                text: 'Community',
                url: '#'
              },
              {
                text: 'Art, Culture and Sport',
                url: '#'
              },
              {
                text: 'Environment and Water',
                url: '#'
              }
            ]
          },
          {
            text: 'News',
            url: '#'
          },
          {
            text: 'Events',
            url: '#'
          },
          {
            text: 'Connect with us',
            url: '#',
            children: [
              {
                text: 'Education',
                url: '#'
              },
              {
                text: 'Housing and Property',
                url: '#'
              },
              {
                text: 'Health',
                url: '#'
              }
            ]
          }
        ]),
        links: object('Links', [
          {
            text: 'Privacy',
            url: '#'
          },
          {
            text: 'Disclaimer',
            url: '#'
          },
          {
            text: 'Terms of use',
            url: '#'
          },
          {
            text: 'Sitemap',
            url: '#'
          },
          {
            text: 'Accessibility Statement',
            url: '#'
          },
          {
            text: 'Help',
            url: '#'
          }
        ]),
        copyright: text('Copyright', '© Copyright State Government of Victoria'),
        acknowledgement: text('Acknowledgement', 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'),
        logos: object('Logos', [
          {
            src: 'https://placehold.it/112x52',
            alt: 'Max native size',
            url: '#'
          },
          {
            src: 'https://placehold.it/32x32',
            alt: 'Smaller than max size',
            url: '#'
          },
          {
            src: 'https://placehold.it/80x200',
            alt: 'Portrait',
            url: '#'
          },
          {
            src: 'https://placehold.it/200x80',
            alt: 'Landscape',
            url: '#'
          }
        ])
      }
    }
  }))
