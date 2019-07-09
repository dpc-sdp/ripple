import { storiesOf } from '@storybook/vue'
import RplDescriptionList from './DescriptionList.vue'

import {
  withKnobs,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/DescriptionList', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplDescriptionList },
    template: `<rpl-description-list :list="list" />`,
    props: {
      list: {
        default: () => object('List', [
          { term: 'List Item 1', description: 'Description' },
          { term: 'List Item 2', description: 'Description 2' },
          { term: 'List Item 3', description: 'Description 3' }
        ])
      }
    }
  }))
