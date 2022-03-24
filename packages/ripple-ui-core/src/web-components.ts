import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/index.vue'
import { default as RplIconCmp } from './components/icon/icon.vue'
import { default as RplAccordionCmp } from './components/accordion/index.vue'

const RplButton = defineCustomElement(RplButtonCmp)
const RplIcon = defineCustomElement(RplIconCmp)
const RplAccordion = defineCustomElement(RplAccordionCmp)

// export individual webcomponents
export { RplButton }
export { RplIcon }
export { RplAccordion }

// export register function for all webcomponents
export function registerRplWebComponents() {
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-icon', RplIcon)
  customElements.define('rpl-accordion', RplAccordion)
}
