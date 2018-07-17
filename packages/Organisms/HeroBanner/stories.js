import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplHeroBanner from './index.vue'
import readme from './README.md'

storiesOf('Organisms/HeroBanner', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Hero Banner', withReadme(readme, () => ({
    components: { RplHeroBanner },
    template: `<rpl-hero-banner
  :title="title" :introText="introText"
  :linkHeading="linkHeading" :links="links"
  :moreLink="moreLink"
  class="rpl-site-constrain--on-all"
/>`,
    data () {
      return {
        title: text('Title', 'This is display copy that wraps 2 lines'),
        introText: text('Intro Text', 'This is supplimentary intro text that can also wrap over a couple of lines.'),
        linkHeading: text('Link Heading', 'Want to know more about...'),
        links: object('Links', [
          { text: 'First journey based link', url: '#' },
          { text: 'Secondary journey based link', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Fourth journey based link', url: '#' }
        ]),
        moreLink: object('More Link', { text: 'See more', url: '#' })
      }
    }
  })))
