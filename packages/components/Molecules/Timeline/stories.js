import { storiesOf } from '@storybook/vue'
import RplTimeline from './Timeline.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Timeline', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplTimeline },
    template: `<rpl-timeline :title="title" :list="list" />`,
    props: {
      title: {
        default: text('Title', 'Timeline Heading')
      },
      list: {
        default: object('List', [{
          image: 'https://placehold.it/320x240',
          title: 'Timeline item with link',
          url: '#',
          dateStart: '2019-01-01T09:00:00.000+10:00',
          dateEnd: '2020-12-01T09:00:00.000+10:00',
          description: 'Contains image, title, internal URL, different start / end date and description.'
        }, {
          title: 'Timeline item 2',
          subtitle: 'Contains title and custom subtitle.'
        }, {
          image: 'https://placehold.it/88x88',
          title: 'Timeline item 3',
          dateStart: '2018-01-01T09:00:00.000+10:00',
          dateEnd: '2018-01-15T09:00:00.000+10:00',
          subtitle: 'Custom subtitle - this should not show.',
          description: 'Contains image, title, different start / end date, subtitle (hidden) and description.'
        }, {
          title: 'Timeline item 4',
          dateStart: '2018-03-01T09:00:00.000+10:00',
          dateEnd: '2018-03-01T09:00:00.000+10:00',
          description: 'Contains title, matching start / end date and description.'
        }, {
          image: 'https://placehold.it/88x88',
          title: 'Timeline item 5 with link',
          url: 'https://www.google.com',
          description: 'Contains an image, title, external URL and description.'
        }
        ])
      }
    }
  }))
