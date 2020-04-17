import { storiesOf } from '@storybook/vue'

import { withKnobs, text, select } from '@storybook/addon-knobs/vue'

import SIcons from './../../../../src/storybook-components/Icons.vue'
import { RplIcon, RplTextIcon } from './index'

storiesOf('Atoms/Icon', module)
  .addDecorator(withKnobs)
  .add('Icon Library', () => ({
    components: { SIcons },
    template: '<s-icons :icons="icons" :color="color" :size="size" />',
    props: {
      color: {
        default: text('Color', 'primary')
      },
      size: {
        default: text('Size', 'm')
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
          'arrow_right_primary_s',
          'arrow_right_primary',
          'arrow_right_secondary',
          'arrow_up_primary',
          'attach',
          'blank_solid',
          'browser',
          'calendar',
          'child_friendly',
          'close',
          'cross_circle',
          'csv',
          'doc',
          'document_transparent',
          'document',
          'docx',
          'dollar_negative',
          'dot',
          'dotm',
          'dotx',
          'down',
          'download',
          'email_solid',
          'email_transparent',
          'enlarge_screen',
          'eps',
          'external_link',
          'facebook',
          'free',
          'fullscreen',
          'hamburger',
          'help',
          'home',
          'ics',
          'image_gallery_arrow_left',
          'image_gallery_arrow_right',
          'indd',
          'instagram',
          'left',
          'link_65',
          'link_90',
          'link',
          'linkedin',
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
          'print',
          'right',
          'search',
          'senior',
          'share_alternative',
          'share',
          'star',
          'stop',
          'success',
          'tick',
          'tif',
          'trash',
          'twitter',
          'txt',
          'up',
          'upload',
          'user',
          'view',
          'webinar',
          'xls',
          'xlsm',
          'xlsx',
          'youtube',
          'zip',
          'zoom_in',
          'zoom_out'
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

// storiesOf('Atoms/Icon', module).add(
//   'Icon Custom',
//   withInfo(`
//     ### Add custom icons
//     To use your own svg icon, you need to name your own custom icon in the same format as Ripple does.
//     A example: \`rpl_icon_arrow\`. Always use \`rpl_icon_\` prefix.

//     You can put your custom icons in any directory in your project, e.g. "/assets/ripple-icons/".

//     To add icons, below code has to be added before you start your app by calling \`new Vue()\`:
//     ~~~javascript
//     import { addCustomIcons } from '@dpc-sdp/ripple-icon'
//     addCustomIcons(require.context('./assets/ripple-icons/', true, /\\.svg$/))
//     ~~~
//     Then you should able to use your own icon as others.

//     To use your own svg icon to replace the default icon, you must use the exact same file name as default.

//     You can find the default icons in [Icon/assets/img](https://github.com/dpc-sdp/ripple/tree/master/packages/components/Atoms/Icon/assets/img).

//     `)(() => ({
//     components: { RplIcon },
//     template: '<rpl-icon symbol="custom_icon" color="primary" size="m" />'
//   }))
// )
