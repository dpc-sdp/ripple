// This custom middleware allows you to override the data passed to the Tide page
// The `pageData` param can be modified for variables used on the page.

export default {
  // Example for alter the pageData.
  exampleMiddlewareAlterPageData: (context, pageData) => {
    if (!pageData.tidePage) {
      return
    }

    // Let's add a css class to Homepage page container
    const targetPath = '/'
    if (context.route.path === targetPath) {
      pageData.tidePage.class = pageData.tidePage.class || []
      pageData.tidePage.class.push('my-example-custom-class')
    }
  },

  // Example for adding a custom component into the landing page body without backend changes.
  exampleMiddlewareAddComponent: (context, pageData) => {
    if (!pageData.tidePage) {
      return
    }

    const targetPath = '/' // Let's add it to Homepage
    const myComponent = {
      name: 'example-message', // You need load this custom component in your "tide.load-components.js"
      data: {
        text: 'This is an example component added by custom middleware.'
      }
    }
    if (context.route.path === targetPath) {
      pageData.tidePage.appDComponents.push(myComponent)
    }
  }
}
