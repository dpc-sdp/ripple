# @dpc-sdp/ripple-nuxt-tide

> The Nuxt module for adding Tide integration.

## Setup

- Add `@dpc-sdp/ripple-nuxt-tide` dependency using yarn or npm to your project
- Add `@dpc-sdp/ripple-nuxt-tide` to `modules` section of `nuxt.config.js`

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
      // Other features
      media: 1,
      webform: 1,
      search: 1,
      monsido: 1,
      authenticatedContent: 0,
      dataDrivenComponent: 0,
      alert: 0
    }
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

TODO...

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
