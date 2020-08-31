<!-- GENERATED_TITLE -->
# @dpc-sdp/ripple-global

<!-- /GENERATED_TITLE -->
<!-- GENERATED_DESCRIPTION -->
> The core styles and utilities used by all ripple components. Includes sets of
colours, fonts, breakpoints.

<!-- /GENERATED_DESCRIPTION -->

--------------------------------------------------------------------------------

## rplOptions

This is a globally available options object to allow passing options between ripple components. Don't abuse this, keep it light as the object gets passed between all components.

```js
  nuxt: false, // enable if using in SSR environment eg: nuxt
  isDev: false, // set to true to enable dev mode, used to show Ripple component errors if have.
  hostname: 'localhost', // set hostname for rpl-link etc
  imgQueryString: (bp) => {
    // Override function that appends query string to images to use with image processing CDN's - see @spc-sdp/ripple-nuxt-ui for example
    return `?height=100&width=200` 
  },
  origin: '', // URL with protocol://host(:port) e.g. http://localhost:3000
  quickexit: false, // enable quick exit feature
  quickexiturl: 'https://www.google.com', // URL to use for quickexit
  plugins: [], // array of cheerio transformer function plugins to pass to RplMarkup
  viclogo: true // whether to display primary vic.gov.au logo
  externalLinksInNewWindow: false // (Bool) Whether links open in new window by default
  card: {
    trimFieldfonts: ['Your-font-name'] // If custom fonts are used in card trimmed field, set them here.
  }
```

For add your options, you need to use the Ripple global plugin in your Vue.js porject.

```JS
import RplGlobal from '@dpc-sdp/ripple-global'
Vue.use(RplGlobal, { // You options ... })
```

For how Vue plugin works, please check https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin.

--------------------------------------------------------------------------------

<!-- GENERATED_INSTALL -->
## Install

```shell
npm install @dpc-sdp/ripple-global --save
```

<!-- /GENERATED_INSTALL -->

--------------------------------------------------------------------------------

<!-- GENERATED_DEPENDENCY_GRAPH -->
## Dependency graph

```shell
@dpc-sdp/ripple-global
├── masonry-layout
├── moment
├── object-fit-images
└── vue-focus
```

<!-- /GENERATED_DEPENDENCY_GRAPH -->

--------------------------------------------------------------------------------

<!-- GENERATED_IMPORT -->
## Import

```js
import { RplDivider } from '@dpc-sdp/ripple-global'
import RplGlobal from '@dpc-sdp/ripple-global'
```

<!-- /GENERATED_IMPORT -->

--------------------------------------------------------------------------------

<!-- GENERATED_USAGE_AND_TESTS -->
## Usage and Tests

See [Storybook/Atoms/Global/Colors](https://ripple.sdp.vic.gov.au/?path=/story/atoms-global--colors).

See [Storybook/Atoms/Global/Fonts](https://ripple.sdp.vic.gov.au/?path=/story/atoms-global--fonts).

See [Storybook/Atoms/Global/Typography](https://ripple.sdp.vic.gov.au/?path=/story/atoms-global--typography).

See [Storybook/Atoms/Global/Breakpoints](https://ripple.sdp.vic.gov.au/?path=/story/atoms-global--breakpoints).

<!-- /GENERATED_USAGE_AND_TESTS -->

--------------------------------------------------------------------------------

## Known issues

* Typography: Display headings (with background) have reduced padding on IE11 / Edge.

--------------------------------------------------------------------------------

<!-- GENERATED_LICENSE -->
## License

Licensed under the Apache-2.0 License.

<!-- /GENERATED_LICENSE -->
