import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplDocumentLink from './DocumentLink.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/DocumentLink', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Document Link', withReadme(readme, () => ({
    components: { RplDocumentLink },
    template: `<rpl-document-link :caption="caption" :name="name" :url="url" :mimetype="mimetype" :filesize="filesize" />`,
    data () {
      return demoData.documentLink()
    }
  })))
