import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import SIcons from '../../../storybook-components/Icons.vue'
import RplIcon from './index.vue'
import readme from './README.md'

storiesOf('Atoms/Icon', module)
  .add('Icon Library', withReadme(readme, () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" />',
    data () {
      return {
        icons: [
          'addition',
          'alert_fire',
          'alert_flood',
          'alert_high_temperature',
          'alert_information',
          'alert_lightning',
          'alert_medical',
          'alert_smoke',
          'alert_transport',
          'arrow_down_primary',
          'arrow_left_primary',
          'arrow_left_secondary',
          'arrow_right_primary',
          'arrow_right_secondary',
          'arrow_up_primary',
          'attach',
          'blank_solid',
          'calendar',
          'close',
          'csv',
          'doc',
          'document',
          'document_transparent',
          'docx',
          'dot',
          'dotm',
          'dotx',
          'down',
          'download',
          'email_solid',
          'email_transparent',
          'external_link',
          'facebook',
          'hamburger',
          'help',
          'home',
          'instagram',
          'left',
          'link',
          'link_65',
          'link_90',
          'loading_star',
          'lock',
          'map_marker',
          'microphone',
          'pause',
          'pdf',
          'phone_number',
          'play',
          'ppt',
          'pptx',
          'right',
          'search',
          'share',
          'share_alternative',
          'star',
          'stop',
          'tick',
          'trash',
          'twitter',
          'txt',
          'up',
          'upload',
          'xls',
          'xlsm',
          'xlsx',
          'zoom_in',
          'zoom_out'
        ]
      }
    }
  })))
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Icon', withReadme(readme, () => ({
    components: { RplIcon },
    template: '<rpl-icon :symbol="icon" :color="color" :size="size" />',
    data () {
      return {
        icon: text('Symbol', 'search'),
        color: text('Color', 'primary'),
        size: text('Size', 'm')
      }
    }
  })))
