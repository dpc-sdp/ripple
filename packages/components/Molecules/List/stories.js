import { storiesOf } from '@storybook/vue'
import RplList from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  select,
  object,
  number
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/List', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplList },
    template: `<rpl-list :title="title" :size="size" :iconScale="iconScale" :iconColor="iconColor" :list="list" :link="link" />`,
    props: {
      title: {
        default: text('Title', 'My List')
      },
      link: {
        default: text('Link', '')
      },
      size: {
        default: () => select('Size', { normal: 'normal', large: 'large' }, 'normal')
      },
      iconScale: {
        default: number('Icon Scale', 1)
      },
      iconColor: {
        default: text('Icon Color', 'primary')
      },
      list: {
        default: () => object('List', [{
          symbol: 'calendar',
          size: '1',
          text: '26 January 2019 - 29 January 2019'
        }, {
          symbol: 'map_marker',
          color: 'danger',
          size: '1.2',
          text: 'Level 10,  101 Collins Street, Melbourne'
        }, {
          symbol: 'help',
          size: '0.8',
          text: '$30 - $50'
        }, {
          symbol: 'star',
          color: 'success',
          link: 'https://www.palacecinemas.com.au/festivals/volvo-scn-film-festival/',
          text: 'https://www.palacecinemas.com.au/festivals/volvo-scn-film-festival/'
        }, {
          symbol: 'addition',
          text: 'Accessible venue'
        }, {
          symbol: 'addition',
          text: 'Child friendly'
        }])
      }
    }
  }))
