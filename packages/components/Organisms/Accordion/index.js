import Vue from 'vue'
import RplAccordion from './Accordion.vue'

// Event bus for handling external open trigger
const RplAccordionEventBus = new Vue()
export { RplAccordionEventBus }
export { RplAccordion }

export default RplAccordion
