import { storiesOf } from '@storybook/vue'
import RplImageGallery from './ImageGallery.vue'
import RplComplexImage from './ComplexImage.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/ImageGallery', module)
  .addDecorator(withKnobs)
  .add('Image Gallery', () => ({
    components: { RplImageGallery },
    template: `<rpl-image-gallery :galleryData="galleryData" :enlargeText="enlargeText" />`,
    props: {
      galleryData: {
        default: () => object('Gallery Data', [{
          image: 'https://placehold.it/1024x768/900/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/900/fff',
          caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate.'
        }, {
          image: 'https://placehold.it/1056x540/090/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/090/fff',
          caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia.'
        }, {
          image: 'https://placehold.it/597x843/009/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/009/fff',
          caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate. Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate.'
        }, {
          image: 'https://placehold.it/2560x1880/099/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/099/fff',
          caption: 'A small caption.'
        }, {
          image: 'https://placehold.it/1920x350/909/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/909/fff',
          caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium.'
        }, {
          image: 'https://placehold.it/1024x768/990/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/990/fff',
          caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim.'
        }, {
          image: 'https://placehold.it/1024x768/000/fff',
          alt: 'A test image',
          title: 'Image title here',
          thumbnail: 'https://placehold.it/604x309/000/fff',
          caption: 'Sed ut perspiciatis unde omnis.'
        }
        ])
      },
      enlargeText: {
        default: text('Enlarge Text', 'Click to enlarge')
      }
    }
  }))
  .add('Complex Image', () => ({
    components: { RplComplexImage },
    template: `<rpl-complex-image :title="title" :image="image" :caption="caption" :source="source" :fullscreen="fullscreen" :expand="expand" :expandTitle="expandTitle" :html="html" :download="download" />`,
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
