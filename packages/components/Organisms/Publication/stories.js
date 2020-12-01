import { storiesOf } from '@storybook/vue'
import RplPublicationDownloadPrint from './PublicationDownloadPrint.vue'
import RplPublicationAuthorInformation from './PublicationAuthorInformation.vue'

import {
  withKnobs,
  text,
  object,
  boolean
} from '@storybook/addon-knobs'

storiesOf('Organisms/Publication', module)
  .addDecorator(withKnobs)
  .add('Publication Download Print', () => ({
    components: { RplPublicationDownloadPrint },
    template: `<rpl-publication-download-print :links="links" :printPage="printPage" :printLink="printLink" @publicationPrint="print" @publicationDownload="download" />`,
    props: {
      links: {
        default: () => object('Links', [{
          name: 'Short title of a document',
          url: '#',
          extension: 'pdf',
          filesize: '1.2 mb'
        }, {
          name: 'External document link',
          url: 'https://www.google.com',
          extension: 'pdf',
          filesize: '1.2 mb'
        }])
      },
      printPage: {
        default: boolean('Show print', false)
      },
      printLink: {
        default: () => object('link', {
          href: '/printall',
          text: 'Print full document'
        })
      }
    },
    methods: {
      print () {
        console.log('PublicationDownloadPrint event received: print')
      },
      download (name) {
        console.log(`PublicationDownloadPrint event received: download "${name}"`)
      }
    }
  }))
  .add('Publication Author Information', () => ({
    components: { RplPublicationAuthorInformation },
    template: `<rpl-publication-author-information
      :date="date"
      :copyright="copyright"
      :author="author"
      :locale="locale"
    />`,
    props: {
      author: {
        default: ['Department of Premier and Cabinet']
      },
      date: {
        default: text('Date', '2018-03-23T09:00:00.000+10:00')
      },
      copyright: {
        default: text('Copyright', 'This is licensed under a Creative Commons Attribution 4.0 International licence. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.')
      },
      locale: {
        default: text('Locale', 'en-au')
      }
    }
  }))
