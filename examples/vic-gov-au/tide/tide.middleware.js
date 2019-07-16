// This custom middleware allows you to override the data passed to the Tide page
// This should always return a object of functions which take the current context as a param
// The results param can be modified for variables used on the page.
// See nuxt-tide/lib/pages/Tide.vue asyncData for execution order
// export default {
//   nameOfMiddlewareA: (context, results) => {
//     results.test = 'foo'
//   },
//   nameOfMiddlewareB: (context, results) => {
//     results.test = 'bar'
//   },
// }

export default {
  // Example for adding a custom component into the landing page without backend changes.
  exampleAddComponent: (context, pageData) => {
    if (!pageData.tidePage) {
      return
    }

    if (context.route.path === '/demo-landing-page') {
      const message = {
        name: 'example-message', // You need load this custom component in your project root "/tide/tide.load-components.js"
        data: {
          text: 'This is an example component added by custom middleware.'
        }
      }
      pageData.tidePage.appDComponents.push(message)
    }
  }
}
