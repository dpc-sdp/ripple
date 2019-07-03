import { storiesOf } from '@storybook/vue'
import RplDocumentLink from './DocumentLink.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  select
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/DocumentLink', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplDocumentLink },
    template: `<rpl-document-link :name="name" :caption="caption" :url="url" :extension="extension" :filesize="filesize" />`,
    props: {
      name: {
        default: text('Name', 'This is the name of the document')
      },
      caption: {
        default: text('caption', 'This is a longer description of the document above.')
      },
      url: {
        default: text('Download url', 'https://www.google.com')
      },
      extension: {
        default: text('Extension', 'pdf')
      },
      filesize: {
        default: text('Filesize', '1.4 mb')
      }
    }
  }))
