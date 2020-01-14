import { storiesOf } from '@storybook/vue'
import RplPublicationPagination from './PublicationPagination.vue'
import RplPublicationDownloadPrint from './PublicationDownloadPrint.vue'
import RplPublicationAuthorInformation from './PublicationAuthorInformation.vue'
import RplPublicationImage from './PublicationImage.vue'

import {
  withKnobs,
  text,
  object,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Publication', module)
  .addDecorator(withKnobs)
  .add('Publication Pagination', () => ({
    components: { RplPublicationPagination },
    template: `<rpl-publication-pagination :previousLink="previousLink" :previousText="previousText" :previousDescription="previousDescription" :nextLink="nextLink" :nextText="nextText" :nextDescription="nextDescription" />`,
    props: {
      previousLink: {
        default: text('Previous Link', '#')
      },
      previousText: {
        default: text('Previous Text', 'Previous')
      },
      previousDescription: {
        default: text('Previous Description', 'Previous page title can wrap over two lines')
      },
      nextLink: {
        default: text('Next Link', '#')
      },
      nextText: {
        default: text('Next Text', 'Next')
      },
      nextDescription: {
        default: text('Next Description', 'Next page title can wrap over two lines')
      }
    }
  }))
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
  .add('Publication Image', () => ({
    components: { RplPublicationImage },
    template: `<rpl-publication-image :title="title" :image="image" :caption="caption" :source="source" :fullscreen="fullscreen" :expand="expand" :expandTitle="expandTitle" :html="html" :download="download" />`,
    props: {
      title: {
        default: text('Title', 'Figure 1.2')
      },
      image: {
        default: () => object('Image', {
          src: 'https://placehold.it/800x400.jpg',
          alt: 'A generic square placeholder image.'
        })
      },
      caption: {
        default: text('Caption', 'This is caption copy for use alongside informational images or for legal information.')
      },
      source: {
        default: text('Source', 'Source: This is for the source to use alongside informational images or for legal information.')
      },
      fullscreen: {
        default: text('Fullscreen', 'View Figure 1.2 in full screen')
      },
      expand: {
        default: text('Expand', 'View Figure 1.2 in table format')
      },
      expandTitle: {
        default: text('Expand Title', 'Figure 1.2')
      },
      html: {
        default: text('Html', `<div class="rpl-markup__table">
        <table>
          <thead>
            <tr>
              <th>Column header one</th>
              <th>Header number two</th>
              <th>Third column header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data point one</td>
              <td>This is a piece of data</td>
              <td>Third column information</td>
            </tr>
            <tr>
              <td>Data pt two</td>
              <td>This is data</td>
              <td>Fourth col info here</td>
            </tr>
            <tr>
              <td>Data point three</td>
              <td>This is a piece of data</td>
              <td>Third column info here</td>
            </tr>
            <tr>
              <td>Point four</td>
              <td>This is some data</td>
              <td>Information goes here</td>
            </tr>
            <tr>
              <td>Five</td>
              <td>This is a piece of data</td>
              <td>Third column info here</td>
            </tr>
            <tr>
              <td>Data point six</td>
              <td>This is some data</td>
              <td>Information</td>
            </tr>
          </tbody>
        </table>
      </div>`)
      },
      download: {
        default: text('Download', 'Download Figure 1.2')
      }
    }
  }))
