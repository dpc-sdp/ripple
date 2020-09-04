import { storiesOf } from '@storybook/vue'

import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/vue'

import SIcons from './../../../../src/storybook-components/Icons.vue'
import { RplIcon, RplTextIcon } from './index'
import './icons/index.js'

storiesOf('Atoms/Icon', module)
  .addDecorator(withKnobs)
  .add('Icon Library', () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" :color="color" :size="size" :stroke="stroke" />',
    props: {
      color: {
        default: text('Color', 'primary')
      },
      size: {
        default: text('Size', 'm')
      },
      stroke: {
        default: boolean('Stroke', false)
      }
    },
    data () {
      return {
        icons: [
          'accessible',
          'addition',
          'ai',
          'alert_fire',
          'alert_flood',
          'alert_high_temperature',
          'alert_information',
          'alert_lightning',
          'alert_medical',
          'alert_smoke',
          'alert_transport',
          'arrow_down_primary',
          'arrow_down_tertiary',
          'arrow_left_primary',
          'arrow_left_secondary',
          'arrow_right_primary',
          'arrow_right_primary_s',
          'arrow_right_secondary',
          'arrow_up_primary',
          'search'
        ]
      }
    }
  }))
  .add('Icon', () => ({
    components: { RplIcon },
    template: '<rpl-icon :symbol="icon" :color="color" :size="size" />',
    propsDescription: {
      // These description will appear in `description` column in props table
      symbol: 'See the Icon Library page for options',
      color: 'Any named color in Global/Colors',
      size: 'One of [s, m, l, xl, xxl]'
    },
    props: {
      icon: {
        default: text('Symbol', 'accessible')
      },
      color: {
        default: text('Color', 'primary')
      },
      size: {
        default: text('Size', 'm')
      }
    }
  }))
  .add('Text Icon', () => ({
    components: { RplTextIcon },
    template:
      '<rpl-text-icon :symbol="icon" :color="color" :size="size" :text="text" :placement="placement"/>',
    props: {
      text: {
        default: text('Text', 'Text Link')
      },
      placement: {
        default: select('Placement', { before: 'before', after: 'after' }, 'after')
      },
      icon: {
        default: text('Symbol', 'search')
      },
      color: {
        default: text('Color', 'primary')
      },
      size: {
        default: text('Size', 'm')
      }
    }
  }))
