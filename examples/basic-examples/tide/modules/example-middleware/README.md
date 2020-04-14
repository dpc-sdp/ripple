# Ripple with custom middleware example

In Nuxt project root `tide/tide.middleware.js` or your custom module
`tide/modules/your-module/tide.middleware.js`, you can add/update page data before
send to page template rendering.

This is similar to [Nuxt routing middleware](https://nuxtjs.org/guide/routing#middleware),
but not exactly same.

This adds the ability for custom business logic for custom site.

## Usage

Add a function in the exported obj like this:

```Javascript
export default {
  // Example for alter the pageData.
  myMiddleware: (context, pageData) => {
    // do something to alter the pageData
  }
}
```

The two parameters are `context` and `pageData`.

- [`context`](https://nuxtjs.org/api/context#the-context) provides additional
objects/params from Nuxt to Vue components. This is same as Nuxt middleware.
- `pageData` is the Ripple page data object. It contains three properties:
  - `tideLayout` a object for layout data

    ```Javascript
      {
        sidebar: true // Boolean, turn on/off sidebar
      }
    ```

  - `tidePage` a object contains all page data for rendering

      ```Javascript
      {
        appPageTitle: '', // String
        appIsHome: true, // Boolean
        appCampaignPrimary: {} // Object
        // ...
      }
    ```

  - `tideErrorType` a string for error type, `404` or `other`

Add multiple functions in middleware:

```Javascript
export default {
  myMiddleware: (context, pageData) => {
    // do something to alter the pageData
  },

  myAnotherMiddleware: (context, pageData) => {
    // do something to alter the pageData
  }
}
```

### Middleware function name

Use a module prefix for your function name so we can prevent conflicts.
Also Use `camelCase` to name the function.

```Javascript
export default {
  myModuleNameMiddlewareOne: (context, pageData) => {
    // do something to alter the pageData
  },

  myModuleNameMiddlewareTwo: (context, pageData) => {
    // do something to alter the pageData
  }
}
