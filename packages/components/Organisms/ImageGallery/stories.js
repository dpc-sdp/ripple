import { storiesOf } from '@storybook/vue'
import RplImageGallery from './no-ssr/ImageGallery.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/ImageGallery', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Image Gallery', () => ({
    components: { RplImageGallery },
    template: `<rpl-image-gallery :galleryData="galleryData" :enlargeText="enlargeText" />`,
    props: {
      galleryData: {
        default: object('Gallery Data', [{
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
