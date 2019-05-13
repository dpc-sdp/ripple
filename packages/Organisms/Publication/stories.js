import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplPublicationPagination from './PublicationPagination.vue'
import RplPublicationDownloadPrint from './PublicationDownloadPrint.vue'
import RplPublicationImage from './PublicationImage.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/Publication', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Publication Pagination', withReadme(readme, () => ({
    components: { RplPublicationPagination },
    template: `<rpl-publication-pagination :previousLink="previousLink" :previousText="previousText" :previousDescription="previousDescription" :nextLink="nextLink" :nextText="nextText" :nextDescription="nextDescription" />`,
    data () {
      return demoData.publicationPagination()
    }
  })))
  .add('Publication Download Print', withReadme(readme, () => ({
    components: { RplPublicationDownloadPrint },
    template: `<rpl-publication-download-print :links="links" :showPrint="showPrint" @publicationPrint="print" @publicationDownload="download" />`,
    data () {
      return demoData.publicationDownloadPrint()
    },
    methods: {
      print () {
        console.log('PublicationDownloadPrint event received: print')
      },
      download (name) {
        console.log(`PublicationDownloadPrint event received: download "${name}"`)
      }
    }
  })))
  .add('Publication Image', withReadme(readme, () => ({
    components: { RplPublicationImage },
    template: `<rpl-publication-image :title="title" :image="image" :caption="caption" :source="source" :fullscreen="fullscreen" :expand="expand" :expandTitle="expandTitle" :html="html" :download="download" />`,
    data () {
      return demoData.publicationImage()
    }
  })))
