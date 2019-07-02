import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  text,
  boolean,
  selectV2,
  withKnobs
} from '@storybook/addon-knobs/vue'

import SColors from './../../../src/storybook-components/Colors.vue'
import SFonts from './../../../src/storybook-components/Fonts.vue'
import STypography from './../../../src/storybook-components/Typography.vue'
import SBreakpoints from './../../../src/storybook-components/Breakpoints.vue'
import RplDivider from './components/Divider.vue'
import readme from './README.md'

storiesOf('Atoms/Global', module)
  .add('Colors', withReadme(readme, () => ({
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
        gradients: [
          'primary_gradient',
          'decorative_gradient'
        ]
      }
    }
  })))

storiesOf('Atoms/Global', module)
  .addDecorator(withKnobs)
  .add('Fonts', withReadme(readme, () => ({
    components: { SFonts },
    template: '<s-fonts :size="size" :lineHeight="lineHeight" :weight="weight" :text="text" :background="background" />',
    data () {
      return {
        size: selectV2('Size', [
          'tera',
          'xgiga',
          'giga',
          'mega',
          'xl',
          'l',
          'm',
          's',
          'xs',
          'xxs'
        ], 'tera'),
        lineHeight: text('Line Height', '1.1em'),
        weight: selectV2('Weight', [
          'regular',
          'medium',
          'semibold',
          'bold'
        ], 'bold'),
        background: boolean('Background', false),
        text: text('Titles', 'The quick brown fox jumps over the lazy dog')
      }
    }
  })))

storiesOf('Atoms/Global', module)
  .addDecorator(withKnobs)
  .add('Typography', withReadme(readme, () => ({
    components: { STypography },
    template: '<s-typography :samples="samples" :text="text" :paragraph="paragraph"/>',
    data () {
      return {
        samples: [
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
        ],
        text: text('Titles', 'The quick brown fox jumps over the lazy dog'),
        paragraph: text('Paragraphs', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae quod nobis earum saepe inventore rerum dicta voluptatem ullam iste rem deleniti odit culpa tempora dolor animi, non, amet ducimus.')
      }
    }
  })))

storiesOf('Atoms/Global', module)
  .add('Breakpoints', withReadme(readme, () => ({
    components: { SBreakpoints },
    template: '<s-breakpoints :breakpoints="breakpoints"/>',
    data () {
      return {
        breakpoints: [
          'xs',
          's',
          'm',
          'l',
          'xl',
          'xxl',
          'xxxl'
        ]
      }
    }
  })))

storiesOf('Atoms/Global', module)
  .addDecorator(VueInfoAddon)
  .add('Divider', withReadme(readme, () => ({
    components: { RplDivider },
    template: '<rpl-divider />'
  })))
