import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplPublishDateAndAuthor from './index.vue'
import readme from './README.md'

storiesOf('Molecules/PublishDateAndAuthor', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Publish Date and Author', withReadme(readme, () => ({
    components: { RplPublishDateAndAuthor },
    template: `<rpl-publish-date-and-author
  :date="date"
  :location="location"
  :author="author"
  :locale="locale"
/>`,
    data () {
      return {
        date: text('Date', '2018-04-22T11:00:00.000+10:00'),
        location: text('Location', 'location'),
        author: text('Author', 'department goes here'),
        locale: text('Locale', 'en-au')
      }
    }
  })))
