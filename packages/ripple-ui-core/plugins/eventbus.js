export default {
  install(app) {
    app.config.globalProperties.$eventbus = {
      track: (cx, component, action) => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          cx: cx,
          name: component,
          action: action
        })
      }
    }
  }
}
