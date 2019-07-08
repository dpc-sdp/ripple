import { storiesOf } from '@storybook/vue'
import RplFeaturedNews from './FeaturedNews.vue'
import RplNewsListing from './NewsListing.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/News', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Featured News', () => ({
    components: { RplFeaturedNews },
    template: `<rpl-featured-news :list="list" />`,
    props: {
      list: {
        default: () => object('List', [
          {
            image: 'https://placehold.it/818x497',
            date: '2018-03-23T09:00:00.000+10:00',
            topic: 'Community',
            title: 'This heading could wrap over two lines',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
            link: { text: 'Call to action', url: '#' }
          },
          {
            image: 'https://placehold.it/818x497',
            date: '2018-03-23T09:00:00.000+10:00',
            topic: 'Community',
            title: 'This heading could wrap over two lines',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
            link: { text: 'Call to action', url: '#' }
          },
          {
            image: 'https://placehold.it/818x497',
            date: '2018-03-23T09:00:00.000+10:00',
            topic: 'Community',
            title: 'This heading could wrap over two lines',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
            link: { text: 'Call to action', url: '#' }
          }
        ])
      }
    }
  }))
  .add('News Listing', () => ({
    components: { RplNewsListing },
    template: `<rpl-news-listing :title="title" :list="list" />`,
    props: {
      title: {
        default: text('Title', 'Latest News')
      },
      list: {
        default: () => object('List', [
          {
            date: '2018-03-26T09:00:00.000+10:00',
            tag: 'Event',
            title: 'Australian Indigenous Tourism Conference',
            url: '#'
          },
          {
            date: '2018-03-25T09:00:00.000+10:00',
            tag: 'Community',
            title: 'Respect Women: Call it Out',
            url: '#'
          },
          {
            date: '2018-03-24T09:00:00.000+10:00',
            tag: 'Arts & Culture',
            title: 'NGV Triennial',
            url: '#'
          },
          {
            date: '2018-02-22T09:00:00.000+10:00',
            tag: 'Sports',
            title: 'The World Games Facilities Fund',
            url: '#'
          },
          {
            date: '2018-02-21T09:00:00.000+10:00',
            tag: 'Law & Justice',
            title: 'Access to Justice Review',
            url: '#'
          },
          {
            date: '2018-02-19T09:00:00.000+10:00',
            tag: 'Family Violence',
            title: 'New Bendigo Refuge for Families Escaping Family Violence',
            url: '#'
          }
        ])
      }
    }
  }))
