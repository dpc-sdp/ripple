import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplImageGallery from './ImageGallery.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Organisms/ImageGallery', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Image Gallery', withReadme(readme, () => ({
    components: { RplImageGallery },
    template: `<rpl-image-gallery :galleryData="galleryData" :enlargeText="enlargeText" />`,
    data () {
      return demoData.imageGallery()
    }
  })))
