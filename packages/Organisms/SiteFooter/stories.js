import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import RplSiteFooter from './index.vue'
import readme from './README.md'

storiesOf('Organisms/SiteFooter', module)
  .addDecorator(VueInfoAddon)
  .add('Site footer', withReadme(readme, () => ({
    components: { RplSiteFooter },
    template: `<rpl-site-footer
:nav="nav"
:links="links"
:copyright="copyright"
/>`,
    data () {
      return {
        nav: [
          {
            text: 'Your Services',
            link: '#',
            children: [
              {
                text: 'Grants awards and assistance',
                link: '#'
              },
              {
                text: 'Law and safety',
                link: '#'
              },
              {
                text: 'Business and Industry',
                link: '#'
              },
              {
                text: 'Jobs and the Workplace',
                link: '#'
              },
              {
                text: 'Transport and Traffic',
                link: '#'
              },
              {
                text: 'Education',
                link: '#'
              },
              {
                text: 'Housing and Property',
                link: '#'
              },
              {
                text: 'Health',
                link: '#'
              },
              {
                text: 'Community',
                link: '#'
              },
              {
                text: 'Art, Culture and Sport',
                link: '#'
              },
              {
                text: 'Environment and Water',
                link: '#'
              }
            ]
          },
          {
            text: 'About VIC Government',
            link: '#',
            children: [
              {
                text: 'Grants awards and assistance',
                link: '#'
              },
              {
                text: 'Law and safety',
                link: '#'
              },
              {
                text: 'Business and Industry',
                link: '#'
              },
              {
                text: 'Jobs and the Workplace',
                link: '#'
              },
              {
                text: 'Transport and Traffic',
                link: '#'
              },
              {
                text: 'Education',
                link: '#'
              },
              {
                text: 'Housing and Property',
                link: '#'
              },
              {
                text: 'Health',
                link: '#'
              },
              {
                text: 'Community',
                link: '#'
              },
              {
                text: 'Art, Culture and Sport',
                link: '#'
              },
              {
                text: 'Environment and Water',
                link: '#'
              }
            ]
          },
          {
            text: 'News',
            link: '#'
          },
          {
            text: 'Events',
            link: '#'
          },
          {
            text: 'Connect with us',
            link: '#',
            children: [
              {
                text: 'Education',
                link: '#'
              },
              {
                text: 'Housing and Property',
                link: '#'
              },
              {
                text: 'Health',
                link: '#'
              }
            ]
          }
        ],
        links: [
          {
            text: 'Privacy',
            link: '#'
          },
          {
            text: 'Disclaimer',
            link: '#'
          },
          {
            text: 'Terms of use',
            link: '#'
          },
          {
            text: 'Sitemap',
            link: '#'
          },
          {
            text: 'Accessibility Statement',
            link: '#'
          },
          {
            text: 'Help',
            link: '#'
          }
        ],
        copyright: '© Copyright State Government of Victoria'
      }
    }
  })))
