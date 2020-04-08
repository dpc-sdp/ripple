export default function ({ app, store }) {
  store.dispatch
  if (process.client) {
    app.router.beforeEach((to, from) => {

    })
    app.router.afterEach((to, from) => {

    })
  }
}