import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplEmbeddedVideo from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/EmbeddedVideo', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Embedded Video', withReadme(readme, () => ({
    components: { RplEmbeddedVideo },
    template: `<rpl-embedded-video
  :width="width"
  :height="height"
  :src="src"
  :lang="lang"
  :variant="variant"
  :mediaLink="mediaLink"
  :transcript="transcript"
/>`,
    data () {
      return demoData.embeddedVideo()
    }
  })))
