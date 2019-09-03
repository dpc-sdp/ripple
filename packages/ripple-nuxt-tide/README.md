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
  ]
}
```

3. Add custom options to `tide` section of `nuxt.config.js`

You Can move some setting value into your env variables.

```js
{
  tide: {
    baseUrl: 'https://your-tide-api-server/', // Mandatory, your Tide API base URL, with a slash in the end.
    auth: {
      username: 'yourUser', // Basic auth credential for Tide API.
      password: 'yourPass' // Basic auth credential for Tide API.
    },
    site: 4, // Mandatory, should be your own site ID in Tide.
    // Tide core modules, 1 for enable, 0 for disable.
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
      authenticatedContent: 1,
      dataDrivenComponent: 0,
      alert: 1,
      gtm: 1
    },
    gtm: {
      id: 'Your-GTM-id' // Optional if you enabled gtm module above
    },
    search: {}
}
```

## Usage

This module is designed for using out of box, so you should able to running the
site without extra work. But you are able to extend the module for
customization requirement.

### Examples

We have code examples for how to customize your Ripple project. We strongly recommend developers have a look at https://github.com/dpc-sdp/ripple/tree/develop/examples/basic-example first.

### Tide Configs

To apply custom work, you need to have `tide` dir in your Nuxt project root.
We recommend you to create modules to modularize your custom work.

Please check the docs for creating custom Tide module https://github.com/dpc-sdp/ripple/tree/develop/examples/basic-examples/tide/modules/README.md.

### Custom theming

Theme customisations are possible and allow you to modify the default style of
your site.

Customisations to the theme should be added to the following root directories:

- `/assets` - Custom [theme](#Theme-variable-overrides), [stylesheets](#Custom-stylesheets), [icons](#Custom-icons).
- `/static` - Custom [images](#Custom-images) (favicons, file icons, header and error graphics).

#### Theme variable overrides

The `/assets/_theme.scss` file should contain any variable overrides. You can find
examples in [custom theming examples](#Custom-theming-examples).

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

#### Custom stylesheets

For defining css, including selectors, a `_custom.scss` file can be added to
`/assets/` and contain any site specific custom styles.
We should avoid to add any changes for Ripple component colours, spacing here.
They are supposed to be managed by sass variables in `_theme.scss`.
This custom file is designed for any style changes can not be handled by Ripple variables.

You can find examples in [custom theming examples](#Custom-theming-examples).

To make it work, you must load the custom scss file in your Nuxt project `css` section of `nuxt.config.js`.

```Javascript
{
  css: [
    '@/assets/_custom.scss'
  ]
}
```

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
