import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

import RplEmbeddedVideo from './index.vue'
import readme from './README.md'

storiesOf('Molecules/EmbeddedVideo', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Embedded Video', withReadme(readme, () => ({
    components: { RplEmbeddedVideo },
    template: `<rpl-embedded-video
  :width="width"
  :height="height"
  :src="src"
  :lang="lang"
  :variant="variant"
  :mediaLink="mediaLink"
  :transcript="transcript"
/>`,
    data () {
      return {
        width: text('width', '854'),
        height: text('height', '480'),
        src: text('field_media_video_embed_field', 'https://www.youtube.com/embed/bSlnfyGTiss'),
        lang: text('langcode', 'en'),
        transcript: text('field_media_transcript', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'),
        variant: 'full',
        mediaLink: text('field_media_link', 'View transcript')
      }
    }
  })))
