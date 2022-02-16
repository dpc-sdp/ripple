import { storiesOf } from '@storybook/vue'

import {
  withKnobs
} from '@storybook/addon-knobs'

import RplStatisticsgrid from './Statisticsgrid.vue'

storiesOf('Molecules/Statisticsgrid', module)
  .addDecorator(withKnobs)
  .add('Statisticsgrid', () => ({
    components: { RplStatisticsgrid },
    template: `<rpl-statisticsgrid />`,
    props: {}
  }))
