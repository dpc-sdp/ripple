# Nuxt Ripple Analytics

> A Nuxt module for handling event tracking using to Google Analytics.

## Installation

To use this package in your Nuxt project first install it with `npm`

```bash
npm install @dpc-sdp/nuxt-ripple-analytics
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/nuxt-ripple-analytics'
  ]
})
```

## Configuration

The [Runtime variable](https://nuxt.com/docs/guide/going-further/runtime-config) for the GTM container ID can be set in the `nuxt.config.js`.

```js
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        analytics: {
          GTM: ''
        }
      }
    }
  }
})
```

It can also be set as an environment variable.

```
# GTM container - this should be common to all SDP sites utilising WoVG analytics
NUXT_PUBLIC_TIDE_ANALYTICS_GTM=GTM-XXXXXXX
```

The [App config](https://nuxt.com/docs/getting-started/configuration#app-configuration) file can be used to add additional event listeners, as well as disable or override the default route change event.

```js
import { trackEvent } from '@dpc-sdp/nuxt-ripple-analytics/events'

export default defineAppConfig({
  ripple: {
    analytics: {
      // routeChange events are enabled by default
      // this parameter can be set to false to disable routeChange events
      // or optional, a function can be returned to run in place of the default
      routeChange: () => {
        return ({ page, site }) => {
          trackEvent({
            // custom event data
            event: 'page_view'
          })
        }
      },

      // custom events listeners can be added here
      eventListeners: {
        'my-custom-event': () => {
          return (payload) => {
            trackEvent({
              // custom event data
              event: payload.action
            })
          }
        }
      }
    }
  }
})
```
