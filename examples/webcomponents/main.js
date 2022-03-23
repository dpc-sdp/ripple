import { registerRplWebComponents } from '@dpc-sdp/ripple-ui-core/webcomponents'
import '@dpc-sdp/ripple-ui-core/style'

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
// Loads all ripple components
registerRplWebComponents()
