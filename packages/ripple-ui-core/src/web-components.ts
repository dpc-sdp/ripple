import { defineCustomElement } from 'vue'
import { default as RplButtonCmp } from './components/button/index.vue'
import { default as RplAccordionCmp } from './components/accordion/index.vue'

const RplButton = defineCustomElement(RplButtonCmp)
const RplAccordion = defineCustomElement(RplAccordionCmp)

// export individual webcomponents
export { RplButton }
export { RplAccordion }

// export register function for all webcomponents
export function registerRplWebComponents() {
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-accordion', RplAccordion)
}
