import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/index.vue'
import { default as RplIconCmp } from './components/icon/icon.vue'

const RplButton = defineCustomElement(RplButtonCmp)
const RplIcon = defineCustomElement(RplIconCmp)

// export individual elements
export { RplButton, RplIcon }

// export register function
export function register() {
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-icon', RplIcon)
}
