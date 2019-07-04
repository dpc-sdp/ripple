import { storiesOf } from '@storybook/vue'
import RplAlert from './Alert.vue'
import RplAlertBase from './AlertBase.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object,
  select
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Alert', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Alert', () => ({
    components: { RplAlert },
    template: `<rpl-alert :title="title" :type="type" :link="link" :alertId="alertId" @rplAlertClose="close" />`,
    props: {
      title: {
        default: text('Title', 'This is an emergency alert.')
      },
      type: {
        default: select('Type', {
          'Emergency': 'Emergency',
          'Fire': 'Fire',
          'Flood': 'Flood',
          'Medical': 'Medical',
          'Lightning': 'Lightning',
          'Pollution': 'Pollution',
          'Heat wave': 'Heat wave',
          'Traffic': 'Traffic'
        }, 'Emergency')
      },
      link: {
        default: object('Link', { text: 'Find out more', url: '#' })
      },
      alertId: {
        default: text('Alert ID', 'test_id')
      }
    },
    methods: {
      close (alertId) {
        alert(`Alert has an ID of "${alertId}"`)
      }
    }
  }))
  .add('Alert Base', () => ({
    components: { RplAlertBase },
    template: `
      <rpl-alert-base :iconSymbol="iconSymbol" :backgroundColor="backgroundColor" :textColor="textColor" :iconColor="iconColor" :closeIconColor="closeIconColor" @rplAlertClose="close">
        <div v-html="content"></div>
      </rpl-alert-base>
    `,
    props: {
      content: {
        default: text('HTML Content', 'Draft only and not yet published')
      },
      iconSymbol: {
        default: text('Icon Symbol', 'alert_information')
      },
      backgroundColor: {
        default: text('Background Color', 'dark_neutral')
      },
      textColor: {
        default: text('Text Color', 'white')
      },
      iconColor: {
        default: text('Icon Color', 'white')
      },
      closeIconColor: {
        default: text('Close Icon Color', 'white')
      }
    },
    methods: {
      close () {
        alert(`Alert base close clicked.`)
      }
    }
  }))
