import RplDivider from './components/Divider.vue'

const RplGlobal = {
  // Provide plugin for Vue to inject options.
  install (Vue, options) {
    const rplOptions = {
      nuxt: false,
      hostname: 'localhost',
      quickexit: true,
      quickexiturl: 'https://www.google.com'
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
