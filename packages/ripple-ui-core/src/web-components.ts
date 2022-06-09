import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/button.vue'
import { default as RplIconCmp } from './components/icon/icon.vue'
import { default as RplTextLinkCmp } from './components/text-link/text-link.vue'
import { default as RplChipCmp } from './components/chip/chip.vue'

const RplButton = defineCustomElement(RplButtonCmp)
const RplIcon = defineCustomElement(RplIconCmp)
const RplTextLink = defineCustomElement(RplTextLinkCmp)
const RplChip = defineCustomElement(RplChipCmp)

// export individual webcomponents
export { RplButton }
export { RplIcon }
export { RplTextLink }
export { RplChip }

// export register function for all webcomponents
export function registerRplWebComponents() {
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-icon', RplIcon)
  customElements.define('rpl-text-link', RplTextLink)
  customElements.define('rpl-chip', RplChip)
}
