# @dpc-sdp/ripple-global

> The core styles and utilities used by all ripple components. Includes sets of
colours, fonts, breakpoints.

# rplOptions
This is a globally available options object to allow passing options between ripple components. Don't abuse this, keep it light as the object gets passed between all components.

```
  nuxt: false, // enable if using in SSR environment eg: nuxt
  hostname: 'localhost', // set hostname for rpl-link etc
  origin: '', // URL with protocol://host(:port) e.g. http://localhost:3000
  quickexit: false, // enable quick exit feature
  quickexiturl: 'https://www.google.com', // URL to use for quickexit
  plugins: [], // array of cheerio transformer function plugins to pass to RplMarkup
  viclogo: true // whether to display primary vic.gov.au logo
```

--------------------------------------------------------------------------------

## Install

```shell
npm install @dpc-sdp/ripple-global --save
```

--------------------------------------------------------------------------------

## Dependency graph

```shell
@dpc-sdp/ripple-global
├── masonry-layout
├── moment
├── object-fit-images
└── vue-focus
```

--------------------------------------------------------------------------------

## Import

```js
import { RplDivider } from '@dpc-sdp/ripple-global'
import RplGlobal from '@dpc-sdp/ripple-global'
```

--------------------------------------------------------------------------------

## Usage and Tests

See [Storybook/Colors](https://ripple.sdp.vic.gov.au/?selectedKind=Atoms/Global&selectedStory=Colors).

See [Storybook/Fonts](https://ripple.sdp.vic.gov.au/?selectedKind=Atoms/Global&selectedStory=Fonts).

See [Storybook/Typography](https://ripple.sdp.vic.gov.au/?selectedKind=Atoms/Global&selectedStory=Typography).

See [Storybook/Breakpoints](https://ripple.sdp.vic.gov.au/?selectedKind=Atoms/Global&selectedStory=Breakpoints).

See [Storybook/Divider](https://ripple.sdp.vic.gov.au/?selectedKind=Atoms/Global&selectedStory=Divider).

--------------------------------------------------------------------------------

## License

Licensed under the Apache-2.0 License.
