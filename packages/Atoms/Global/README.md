# @dpc-sdp/ripple-global

The core module all SDP Ripple modules depend on.

## Install
`npm install @dpc-sdp/ripple-global --save`

### Nuxt.js

For **Nuxt** app, register RplGlobal plugin by adding `plugins/ripple.js` file:
```
import Vue from 'vue'
import RplGlobal from '@dpc-sdp/ripple-global'

const rplOptions = {
  nuxt: true
}

Vue.use(RplGlobal, rplOptions)
```

Then add `plugins/ripple.js` to plugins section of **nuxt.config.js**:
```
{
  plugins: [
    '~/plugins/ripple'
  ]
}
```

### Others

If you are not using **Nuxt**, register RplGlobal plugin in your app entry point:

```
import Vue from 'vue'
import RplGlobal from '@dpc-sdp/ripple-global'

Vue.use(RplGlobal)
```

## Usage
In Sass:
```scss
@import "~@dpc-sdp/ripple-global/style"
```

### Typography

The `$rpl-typography` variable can be overridden to define font rules for
multiple typesets with multiple breakpoints.

Example:
```scss
$rpl-typography: (
  // Define a typeset with a rule.
  'heading': ('xl', 1.5em, 'bold', true),
  'body': ('m', 1.2em, 'regular'),

  // Define a typeset with breakpoints.
  'heading_responsive': (
    'xs': ('s', 1em, 'bold', true),
    'm': ('m', 1.1em, 'bold', true),
    'l': ('l', 1.2em, 'bold', true),
    'xl': ('xl', 1.2em, 'regular', true),
  )
);
```

A rule consists of:

`('font_size', line_height, 'weight', show_background)`

* `font_size` - String - a value from the `$rpl-font-sizes` list.
* `line_height` - CSS rule - a value for line-height.
* `weight` - String - a value from the `$rpl-fonts` list.
* `show_background` - Optional Boolean - display a background. Expects inner HTML wrapped in a span.

A typeset name (e.g. `'heading'`) can be assigned a rule or a list of breakpoints with rules.

A breakpoint list should include `xs` to ensure font rules are defined for mobile size.

Typesets can be added to CSS selectors with the `rpl_typography()` mixin.

```scss
.responsive-header {
  @include rpl_typography('heading_responsive');
}

body {
  @include rpl_typography('body');
}
```
