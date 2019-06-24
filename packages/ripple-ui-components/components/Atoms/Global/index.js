import RplDivider from './components/Divider.vue'

const RplGlobal = {
  // Provide plugin for Vue to inject options.
  install (Vue, options) {
    const rplOptions = {
      nuxt: false,
      hostname: 'localhost',
      origin: '', // URL with protocol://host(:port) e.g. http://localhost:3000
      quickexit: false,
      quickexiturl: 'https://www.google.com',
      viclogo: true
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

export { RplDivider }
