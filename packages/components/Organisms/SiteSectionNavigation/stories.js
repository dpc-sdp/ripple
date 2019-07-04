import { storiesOf } from '@storybook/vue'
import RplSiteSectionNavigation from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/SiteSectionNavigation', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Site Section Navigation', () => ({
    components: { RplSiteSectionNavigation },
    template: `<rpl-site-section-navigation :menu="menu" :title="title" :activeLink="activeLink" />`,
    props: {
      title: {
        default: text('Title', 'Branch name goes here')
      },
      menu: {
        default: object('Menu Links', [
          {
            text: 'Your services',
            url: '#',
            children: [
              { text: 'Sub child A', url: '#' },
              {
                text: 'Sub child B - With level 3',
                url: '#',
                children: [
                  {
                    text: 'Sub child I',
                    url: '#',
                    children: [
                      { text: 'Level 3 child I', url: '#' },
                      { text: 'Level 3 child II', url: '#' },
                      { text: 'Level 3 child III', url: '#' }
                    ]
                  },
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
                      { text: 'Sub child X', url: '/active-link' },
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
      activeLink: {
        default: text('Active Link', '/active-link')
      }
    }
  }))
