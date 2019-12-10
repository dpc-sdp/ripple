import { storiesOf } from '@storybook/vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplListGroup from './ListGroup.vue'
import RplListGroupItem from './ListGroupItem.vue'

// Test components.
import RplDocumentLink from '../DocumentLink/DocumentLink.vue'
import RplButton from '../../Atoms/Button'

storiesOf('Molecules/ListGroup', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplListGroup, RplListGroupItem },
    template: `
      <rpl-list-group>
        <rpl-list-group-item :heading="heading">
          <div>{{ content }}</div>
        </rpl-list-group-item>
        <rpl-list-group-item :heading="heading">
          <div>{{ content }}</div>
        </rpl-list-group-item>
        <rpl-list-group-item :heading="heading">
          <div>{{ content }}</div>
        </rpl-list-group-item>
      </rpl-list-group>
    `,
    props: {
      heading: {
        default: text('Heading', 'Test Element')
      },
      content: {
        default: text('Content', 'Lorem eiusmod enim deserunt minim.')
      }
    }
  }))
  .add('With components', () => ({
    components: { RplListGroup, RplListGroupItem, RplDocumentLink, RplButton },
    template: `
      <rpl-list-group>
        <rpl-list-group-item heading="Document link and button">
          <rpl-document-link name="Test document" caption="An example document link" url="https://vic.gov.au" extension="pdf" filesize="1.2 MB" />
          <rpl-button theme="primary">Example call to action</rpl-button>
        </rpl-list-group-item>
        <rpl-list-group-item heading="Document links">
          <rpl-document-link name="Document A" url="https://vic.gov.au" extension="docx" filesize="128 KB" />
          <rpl-document-link name="Document B" url="https://vic.gov.au" extension="xlsx" filesize="256 KB" />
        </rpl-list-group-item>
      </rpl-list-group>
    `
  }))
