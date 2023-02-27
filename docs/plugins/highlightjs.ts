import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import hljsVuePlugin from '@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js'

export default defineNuxtPlugin((nuxtApp) => {
  hljs.registerLanguage('xml', xml)
  nuxtApp.vueApp.use(hljsVuePlugin)
})
