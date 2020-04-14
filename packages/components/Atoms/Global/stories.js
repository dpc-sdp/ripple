import { storiesOf } from '@storybook/vue'

import { text, boolean, select, withKnobs } from '@storybook/addon-knobs/vue'

import SColors from './../../../../src/storybook-components/Colors.vue'
import SFonts from './../../../../src/storybook-components/Fonts.vue'
import STypography from './../../../../src/storybook-components/Typography.vue'
import SBreakpoints from './../../../../src/storybook-components/Breakpoints.vue'

storiesOf('Atoms/Global', module).add('Colors', () => ({
  components: { SColors },
  template: '<s-colors :colors="colors" :gradients="gradients"/>',
  data () {
    return {
      colors: [
        'primary',
        'dark_primary',
        'secondary',
        'extra_dark_neutral',
        'dark_neutral',
        'mid_neutral_1',
        'mid_neutral_2',
        'light_neutral',
        'danger',
        'warning',
        'success',
        'white'
      ],
      gradients: ['primary_gradient', 'decorative_gradient']
    }
  }
}))

storiesOf('Atoms/Global', module)
  .addDecorator(withKnobs)
  .add('Fonts', () => ({
    components: { SFonts },
    template:
      '<s-fonts :size="size" :lineHeight="lineHeight" :weight="weight" :text="text" :background="background" />',
    props: {
      size: {
        default: select(
          'Size',
          ['tera', 'xgiga', 'giga', 'mega', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
          'tera'
        )
      },
      lineHeight: {
        default: text('Line Height', '1.1em')
      },
      weight: {
        default: select(
          'Weight',
          ['regular', 'medium', 'semibold', 'bold'],
          'bold'
        )
      },
      background: {
        default: boolean('Background', false)
      },
      text: {
        default: text('Titles', 'The quick brown fox jumps over the lazy dog')
      }
    }
  }))

storiesOf('Atoms/Global', module)
  .addDecorator(withKnobs)
  .add('Typography', () => ({
    components: { STypography },
    template:
      '<s-typography :samples="samples" :text="text" :paragraph="paragraph"/>',
    props: {
      samples: {
        default: () => ([
          'display_l',
          'display_m',
          'display_s',
          'supporting_l',
          'supporting_m',
          'supporting_s',
          'heading_l',
          'heading_m',
          'heading_s',
          'heading_xs',
          'body_large',
          'body_default',
          'body_small',
          'copy_extra_small'
        ])
      },
      text: {
        default: text('Titles', 'The quick brown fox jumps over the lazy dog')
      },
      paragraph: {
        default: text(
          'Paragraphs',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae quod nobis earum saepe inventore rerum dicta voluptatem ullam iste rem deleniti odit culpa tempora dolor animi, non, amet ducimus.'
        )
      }
    }
  }))

storiesOf('Atoms/Global', module)
  .add('Breakpoints', () => ({
    components: { SBreakpoints },
    template: '<s-breakpoints :breakpoints="breakpoints"/>',
    data () {
      return {
        breakpoints: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
      }
    }
  }))
