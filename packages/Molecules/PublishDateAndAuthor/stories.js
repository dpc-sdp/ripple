import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplPublishDateAndAuthor from './index.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

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
      return demoData.publishDateAndAuthor()
    }
  })))
