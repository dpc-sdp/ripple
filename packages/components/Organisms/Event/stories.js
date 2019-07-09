import { storiesOf } from '@storybook/vue'
import RplLatestEvents from './LatestEvents.vue'

import { withKnobs, text, object } from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Event', module)
  .addDecorator(withKnobs)
  .add('Latest Events', () => ({
    components: { RplLatestEvents },
    template: `<rpl-latest-events :events="events" :cta="cta" :link="link" :title="title" />`,
    props: {
      title: {
        default: text('Title', 'Optional heading')
      },
      events: {
        default: () => object('Events', [
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2018-12-25T09:00:00.000+10:00',
            dateEnd: '2019-01-05T09:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary:
              'This event range occurs in 2018 and goes to 2019. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
            link: { text: 'See event details', url: '#' }
          },
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2018-05-09T09:00:00.000+10:00',
            dateEnd: '2018-05-10T09:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary:
              'This event range occurs in 2018, same month different day.',
            link: { text: 'See event details', url: '#' }
          },
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2018-02-12T09:00:00.000+10:00',
            dateEnd: '2018-02-12T15:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary:
              'This event range occurs in 2018, same day, different time.',
            link: { text: 'See event details', url: '#' }
          },
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2018-08-01T09:00:00.000+10:00',
            dateEnd: '2018-09-02T09:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary:
              'This event range occurs in 2018. Same year, different month.',
            link: { text: 'See event details', url: '#' }
          },
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2020-02-02T09:00:00.000+10:00',
            location: 'South Yarra',
            title:
              'This is the headline of an event with a location that will stretch over over 3 lines',
            summary:
              'This single date event occurs in 2020. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
            link: { text: 'See event details', url: '#' }
          },
          {
            image: 'https://placehold.it/580x340',
            dateStart: '2019-07-10T09:00:00.000+10:00',
            location: 'South Yarra',
            title:
              'This is the headline of an event with a location that will stretch over over 3 lines',
            summary:
              'This single date event occurs in 2019. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
            link: { text: 'See event details', url: '#' }
          }
        ])
      },
      cta: {
        default: () => object('Call to Action', {
          image: 'https://placehold.it/148x148',
          title: 'Want to submit an event?',
          summary:
            'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.',
          link: { text: 'Submit a listing', url: '#' }
        })
      },
      link: {
        default: () => object('Link', { text: 'See all events', url: '#' })
      }
    }
  }))
