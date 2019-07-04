import { storiesOf } from '@storybook/vue'
import RplPublishDateAndAuthor from './index.vue'
import readme from './README.md'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/PublishDateAndAuthor', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Default', () => ({
    components: { RplPublishDateAndAuthor },
    template: `
      <rpl-publish-date-and-author
      :date="date"
      :location="location"
      :author="author"
      :locale="locale"
      />
    `,
    props: {
      date: {
        default: text('Date', '2018-04-22T11:00:00.000+10:00')
      },
      location: {
        default: text('Location', 'location')
      },
      author: {
        default: text('Author', 'department goes here')
      },
      locale: {
        default: text('Locale', 'en-au')
      }
    }
  }))
