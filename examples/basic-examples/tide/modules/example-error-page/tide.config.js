const tideConfig = {
  errorPage: {
    '404': {
      intro: `[Example] This is a custom 404 error message.<br>A new line.`,
      main: `<p>Your custom main 404 error message. You can add a link like this: <a class="rpl-link" href="/connect-with-us">contact us</a>.</p>`,
      cta: {
        url: `/500`,
        text: `Go to 500 error.`
      }
    },
    other: {
      intro: `[Example] This is a custom 500 error message.`,
      main: `Your custom main 500 error message. You can add a link like this: <a class="rpl-link" href="/connect-with-us">contact us</a>.`,
      cta: {
        url: `/404`,
        text: `Go to 404 error`
      }
    }
  }
}

module.exports = tideConfig
