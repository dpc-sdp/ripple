import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplPublicationPagination from './PublicationPagination.vue'
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
