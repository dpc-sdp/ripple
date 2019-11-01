import { storiesOf } from '@storybook/vue'
import RplEmbeddedVideo from './index.vue'

import {
  withKnobs,
  text,
  select,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/EmbeddedVideo', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplEmbeddedVideo },
    template: `
      <rpl-embedded-video
        :width="width"
        :height="height"
        :src="src"
        :variant="variant"
        :mediaLink="mediaLink"
        :transcript="transcript"
      />
    `,
    props: {
      width: {
        default: text('width', '854')
      },
      height: {
        default: text('height', '480')
      },
      src: {
        default: text('field_media_video_embed_field', 'https://www.youtube.com/embed/bSlnfyGTiss')
      },
      transcript: {
        default: text('field_media_transcript', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?')
      },
      variant: {
        default: () => select('Variant', { full: 'full', link: 'link' }, 'full')
      },
      mediaLink: {
        default: () => object('field_media_link', { text: 'View transcript', url: '#' })
      }
    }
  }))
