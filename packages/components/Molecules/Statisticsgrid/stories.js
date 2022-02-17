import { storiesOf } from '@storybook/vue'

import {
  withKnobs
} from '@storybook/addon-knobs'

import RplStatisticsGrid from './StatisticsGrid.vue'

storiesOf('Molecules/StatisticsGrid', module)
  .addDecorator(withKnobs)
  .add('StatisticsGrid', () => ({
    components: { RplStatisticsGrid },
    template: `<rpl-statistics-grid />`,
    props: {}
  }))
