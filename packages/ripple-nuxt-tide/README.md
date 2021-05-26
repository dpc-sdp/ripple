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
    proxyTimeout: 60000, // Optional. Proxy request timeout. Default to 60s.
    tideTimeout: 10000, // Optional. Tide API request timeout. Default to 10s.
    tideListingTimeout: 30000, // Optional. Tide API listing request timeout. Default to 30s.
    // Tide core modules, 1 for enable, 0 for disable.
    // Should match the Tide backend modules.
    modules: {
      // Core features
      site: 1,
      preview: 1,
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
      alert: 1
    },
    search: {},
    // For devOps to set custom cache purge regex patterns if needs
    cachePurgePattern: [
      'your-custom-api-url-regex-pattern'
    ]
}
```

## Usage

This module is designed for using out of box, so you should able to running the
site without extra work. But you are able to extend the module for
customization requirement.

### Examples

We have code examples for how to customize your Ripple project. We strongly recommend developers have a look at https://github.com/dpc-sdp/ripple/tree/develop/examples/basic-examples first.

### Tide Configs & Tide modules

To apply custom work, you need to have `tide` dir in your Nuxt project root.
We recommend you to create modules to modularize your custom work. Tide modules are functions that are called sequentially when booting Nuxt.

Please check the docs for creating custom Tide module https://github.com/dpc-sdp/ripple/blob/master/examples/basic-examples/tide/modules/README.md.

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
  'dark_neutral_1': darkslategrey,
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

To enable custom icons, register your icon by creating a JS file with a structure below.

```Javascript
import Icon from '@dpc-sdp/ripple-icon'

Icon.register({
  'custom_arrow_right': {
    width: 10,
    height: 10,
    paths: [
      {
        d: 'M0 10c0 5.524 4.476 10 10 10s10-4.476 10-10S15.524 0 10 0 0 4.476 0 10zm18.065 0A8.062 8.062 0 0110 18.065 8.062 8.062 0 011.935 10 8.062 8.062 0 0110 1.935 8.062 8.062 0 0118.065 10zM10.44 4.762l4.895 4.895c.19.19.19.496 0 .686l-4.895 4.895a.484.484 0 01-.686 0l-.79-.79a.483.483 0 01.008-.694l2.834-2.706H5.323a.485.485 0 01-.484-.483v-1.13c0-.266.217-.483.484-.483h6.483L8.972 6.246a.483.483 0 01-.008-.694l.79-.79c.19-.19.496-.19.686 0z'
      }
    ],
    polygons: []
  }
})
```

Update the name of the icon - this will be used for symbol prop later, `width`, `height`, `paths` and `polygons` accordingly.
Add this to `assets/ripple-icon/index.js`

```javascript
import './custom_arrow_right.js'
```

Then in `nuxt.config.js`, add a `customIcon` boolean into the `ripple` config:

```js
ripple: {
  customIcon: true
},
```

The new custom icon can now be used as a normal rpl-icon.
```html
<rpl-icon symbol="custom_arrow_right" color="primary" size="m" />
```
##### Overriding an existing icon

Custom icons with a duplicate name takes higher specificity therefore overrides the default.
Ensure to name the icon uniquely if you just wanted a new icon not defined in icon library.

##### Adding a new icon

An icon with a unique name will be added to the default library.
The process is the same as above when adding a custom icon.

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
