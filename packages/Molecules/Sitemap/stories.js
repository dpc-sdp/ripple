import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  object
} from '@storybook/addon-knobs/vue'

import RplSitemap from './index.vue'
import readme from './README.md'

storiesOf('Molecules/Sitemap', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Sitemap', withReadme(readme, () => ({
    components: { RplSitemap },
    template: `<rpl-sitemap :menu="menu" />`,
    data () {
      return {
        menu: object('Menu Links', [
          {
            text: 'Your services',
            url: '#',
            children: [
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
      }
    }
  })))
