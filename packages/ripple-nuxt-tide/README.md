# @dpc-sdp/ripple-nuxt-tide

> The Nuxt module for adding Tide integration.

## Setting up Tide

1. Add `@dpc-sdp/ripple-nuxt-tide` dependency using yarn or npm to your project

```bash
yarn add @dpc-sdp/ripple-nuxt-tide # or npm install @dpc-sdp/ripple-nuxt-tide
```

2. Add `@dpc-sdp/ripple-nuxt-tide` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@dpc-sdp/ripple-nuxt-tide'
  ],

  tide: {
    // nuxt-tide options
    baseUrl: 'https://your-tide-api-server/',
    auth: {
      username: 'yourUser',
      password: 'yourPass'
    },
    site: false, // Should be your own site ID in Tide, use false if site module is not enabled.
    // Custom tide filters
    customConfig: {
      include: {},
      mapping: {}
    },
    // Custom mapping filters
    customFilters: {},
    // Tide submodules, 1 for enable, 0 for disable.
    // Should match the Tide backend modules.
    modules: {
      site: 1,
      // Content types
      page: 1,
      landingPage: 1,
      event: 1,
      news: 1,
      grant: 1,
      profile: 1,
      publication: 1,
      // Other features
      media: 1,
      webform: 1,
      search: 1,
      monsido: 1,
      authenticatedContent: 0,
      dataDrivenComponent: 0,
      alert: 0,
      gtm: 1
    },
    gtm: {},
    search: {}
  }
}
```

## Custom development

We are still working on this part to make a stable API for developers to allow customization.
Docs here will be update to date soon.

You will need below config file in your Nuxt root to make @dpc-sdp/ripple-nuxt-tide work at this stage.

- tide.config.js
- tide.mapping-filters.js
- tide.middleware.js
- tide.load-components.js
- tide.page-types.js

### Custom theming

Theme customisations are possible and allow you to modify the default style of
your site.

Customisations to the theme should be added to the following root directories:

- `/assets` - Custom [theme](#Theme-variable-overrides), [stylesheets](#Custom-stylesheets), [icons](#Custom-icons).
- `/static` - Custom [images](#Custom-images) (favicons, file icons, header and error graphics).

#### Theme variable overrides

The `/assets/_theme.scss` file should contain any variable overrides.

Each componnet in ripple includes variables which can be overridden.
These can be identified by the `!default` suffix:

```scss
// From `@dpc-sdp/rpl-global/scss/settings/_button.scss`
$rpl-button-border-radius: rem(4px) !default;
```

E.g. the colour set and button radius can be customised with the following:

```scss
// Replace default colours.
$rpl-colors: (
  'primary': blue,
  'dark_primary': darkblue,
  'secondary': purple,
  'extra_dark_neutral': black,
  'dark_neutral': darkslategrey,
  'mid_neutral_1': slategrey,
  'mid_neutral_2': grey,
  'light_neutral': lightgrey,
  'danger': maroon,
  'warning': darkorange,
  'success': green,
  'white': white,
  'black': black
);

// Remove border radius from buttons
$rpl-button-border-radius: 0;
```

See [styleResources](#styleResources) for including `_theme.scss` in configuration.

#### Custom stylesheets

For defining css, including selectors, a `_custom.scss` file can be
added to `/assets/` and contain any site specific custom styles.

This can include:

- Overriding selectors and rules
- Additional library stylesheets

This file should only be included _once_ in the project, usually in
`@dpc-sdp/ripple-nuxt-tide/lib/layouts/default.vue`.

<!-- TODO: Update when default.vue is fixed to work with _custom.scss -->
**Note:** `default.vue` currently does not include `_custom.scss`.

#### Custom icons

This folder should include any custom icons you wish to override or add to the
`rpl-icon` library.

To enable custom icons, place your custom icon `.svg` files into `/ripple-icon/`
folder with a `rpl_icon_` prefix, followed by the name of the icon.

Then in `nuxt.config.js`, add a `customIcon` boolean into the `ripple` config:

```js
ripple: {
  customIcon: true
},
```

##### Overriding an existing icon

Custom icons with a duplicate name to an existing default library icon will be
imported instead of their default.

E.g. The default `close` icon will be overridden by the following:

```txt
/ripple-icon/rpl_icon_close.svg
```

##### Adding a new icon

An icon with a unique name will be added to the default library.

E.g. A `feedback` icon could be added by including the following:

```txt
/ripple-icon/rpl_icon_feedback.svg
```

And could be referenced in a component with:

```html
<rpl-icon symbol="feedback" />
```

#### Custom images

Site graphics are found in the `/static/` directory and can be replaced with
custom graphics if needed.

This includes the following:

- Favicons (including android / iOS / ms graphics)
- File Icons (doc, csv, pdf, ppt, xls, etc.)
- Header background graphics (Top left, bottom right)
- Error banners (Oops, Sorry graphics)

It is important that if replacing the graphics, they match the same properties
as the graphic they are replacing.

E.g. The following properties should match:

- File name (header-pattern-shape.png)
- File type (.png)
- Image dimensions (1790x1548)

**Note:** Error banners can also be defined in [Custom error page text](#Custom-error-page-text).

### Custom error page text

In nuxt `tide.config.js`, use below config to add your own error page text, HTML is supported.

```Javascript
const tideConfig = {
  errorPage: {
    '404': {
      img: '/img/oops-banner.svg',
      intro: `This is the 404 error message.<br>Sorry, we couldn't find the page you were looking for.`,
      main: `Have a look at the web address to make sure it was typed correctly. We may also have deleted this page.
  If none of our suggestions help you find the information you were looking for,
  please <a class="rpl-link" href="/connect-with-us">contact us</a>.`,
      cta: {
        url: `/`,
        text: `Go to home`
      }
    },
    other: {
      img: '/img/sorry-banner.svg',
      intro: `We have a glitch in our system.`,
      main: `We are aware of the issue. We appreciate your patience while we're looking into it.`,
      cta: {
        url: `/`,
        text: `Go to home`
      }
    }
  }
}
```

If you just want to change one item, you can only add one item.

```Javascript
const tideConfig = {
  errorPage: {
    '404': {
      intro: `I just want to change 404 page intro text.`
    }
  }
}
```

You may want to update your nuxt project `/app/views/error.html` which is a static HTML page for nuxt server error. It's actually not recommended as you have to do it manually.
