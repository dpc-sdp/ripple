import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/index.vue'

const RplButton = defineCustomElement(RplButtonCmp)

// export individual elements
export { RplButton }

// export register function
export function register() {
  customElements.define('rpl-button', RplButton)
}
