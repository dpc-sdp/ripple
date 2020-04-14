import { storiesOf } from '@storybook/vue'
import { RplSiteFooter, RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/SiteFooter', module)
  .addDecorator(withKnobs)
  .add('Site footer', () => ({
    components: { RplSiteFooter },
    template: `
      <rpl-site-footer
        :nav="nav"
        :links="links"
        :copyright="copyright"
        :acknowledgement="acknowledgement"
        :caption="caption"
        :logos="logos"
      />
    `,
    props: {
      nav: {
        default: () => object('Nav', [
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
        ])
      },
      links: {
        default: () => object('Links', [
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
        ])
      },
      copyright: {
        default: text('Copyright', '© Copyright State Government of Victoria')
      },
      acknowledgement: {
        default: text('Acknowledgement', 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.')
      },
      caption: {
        default: text('Caption', 'Image credit: This caption is used to describe the image in the hero banner above.')
      },
      logos: {
        default: () => object('Logos', [
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
  .add('Acknowledgement', () => ({
    components: { RplAcknowledgement },
    template: '<rpl-acknowledgement :text="text" />',
    props: {
      text: {
        default: text('Text', 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.')
      }
    }
  }))
