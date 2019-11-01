import RplDivider from './components/Divider.vue'
import RplDevError from './components/DevError.vue'

const RplGlobal = {
  // Provide plugin for Vue to inject options.
  install (Vue, options) {
    const rplOptions = {
      nuxt: false,
      isDev: false, // Set to true to display error when error captured.
      hostname: 'localhost',
      origin: '', // URL with protocol://host(:port) e.g. http://localhost:3000
      quickexit: false,
      quickexiturl: 'https://www.google.com',
      viclogo: true,
      externalLinksInNewWindow: false // (Bool) Whether links open in new window by default
    }

    const mergedOptions = Object.assign({}, rplOptions, options)

    Vue.mixin({
      data: function () {
        return {
          rplOptions: mergedOptions
        }
      }
    })
  }
}

export default RplGlobal

export { RplDivider, RplDevError }
