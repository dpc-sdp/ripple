import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/button.vue'
import { default as RplIconCmp } from './components/icon/icon.vue'
import { default as RplTextLinkCmp } from './components/text-link/text-link.vue'

const RplButton = defineCustomElement(RplButtonCmp)
const RplIcon = defineCustomElement(RplIconCmp)
const RplTextLink = defineCustomElement(RplTextLinkCmp)

// export individual webcomponents
export { RplButton }
export { RplIcon }

// export register function for all webcomponents
export function registerRplWebComponents() {
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-icon', RplIcon)
  customElements.define('rpl-text-link', RplTextLink)
}
