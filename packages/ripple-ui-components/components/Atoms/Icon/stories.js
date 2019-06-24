import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon, { withInfo } from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import SIcons from '../../../src/storybook-components/Icons.vue'
import { RplIcon, RplTextIcon } from './index'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Atoms/Icon', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'Icon Library',
    withReadme(readme, () => ({
      components: { SIcons },
      template: '<s-icons :icons="icons" :color="color" :size="size" />',
      data () {
        return demoData.iconLibrary()
      }
    }))
  )
  .add('Icon', withReadme(readme, () => ({
    components: { RplIcon },
    template: '<rpl-icon :symbol="icon" :color="color" :size="size" />',
    propsDescription: {
      // These description will appear in `description` column in props table
      symbol: 'See the Icon Library page for options',
      color: 'Any named color in Global/Colors',
      size: 'One of [s, m, l, xl, xxl]'
    },
    data () {
      return demoData.icon()
    }
  })))
  .add('Text Icon', withReadme(readme, () => ({
    components: { RplTextIcon },
    template: '<rpl-text-icon :symbol="icon" :color="color" :size="size" :text="text" :placement="placement"/>',
    data () {
      return demoData.textIcon()
    }
  })))

storiesOf('Atoms/Icon', module)
  .add(
    'Icon Custom',
    withInfo(`
    ### Add custom icons
    To use your own svg icon, you need to name your own custom icon in the same format as Ripple does.
    A example: \`rpl_icon_arrow\`. Always use \`rpl_icon_\` prefix.

    You can put your custom icons in any directory in your project, e.g. "/assets/ripple-icons/".

    To add icons, below code has to be added before you start your app by calling \`new Vue()\`:
    ~~~javascript
    import { addCustomIcons } from '@dpc-sdp/ripple-icon'
    addCustomIcons(require.context('./assets/ripple-icons/', true, /\\.svg$/))
    ~~~
    Then you should able to use your own icon as others.

    To use your own svg icon to replace the default icon, you must use the exact same file name as default.

    You can find the default icons in [Icon/assets/img](https://github.com/dpc-sdp/ripple/tree/master/packages/ripple-ui-components/components/Atoms/Icon/assets/img).

    `)(() => ({
      components: { RplIcon },
      template: '<rpl-icon symbol="custom_icon" color="primary" size="m" />'
    })))
