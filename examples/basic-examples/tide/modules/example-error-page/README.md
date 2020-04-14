# Ripple with custom error page example

In Nuxt project root `tide/tide.config.js` or your custom module
`tide/modules/your-module/tide.config.js`, use below config to add your own error
page text, HTML is supported.

```Javascript
const tideConfig = {
  errorPage: {
    '404': {
      img: '/img/oops-banner.svg', // To use custom image, you can just
      // replace this image in Nuxt root "/static/img/", no need to add this line.
      intro: `This is the 404 error message.<br>Sorry, we couldn't find the page
      you were looking for.`,
      main: `Have a look at the web address to make sure it was typed correctly.
      We may also have deleted this page.
  If none of our suggestions help you find the information you were looking for,
  please <a class="rpl-link" href="/connect-with-us">contact us</a>.`,
      cta: {
        url: `/`,
        text: `Go to home`
      }
    },
    other: {
      img: '/img/sorry-banner.svg', // To use custom image, you can just
      // replace this image in Nuxt root "/static/img/", no need to add this line.
      intro: `We have a glitch in our system.`,
      main: `We are aware of the issue. We appreciate your patience while we're
      looking into it.`,
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

You may want to update your Nuxt project `/app/views/error.html` which is a static
HTML page for Nuxt server error. It's actually not recommended as you have to do
it manually.

More detail, please refer [@dpc-sdp/ripple-nuxt-tide](/packages/ripple-nuxt-tide/README.md).
