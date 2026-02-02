/**
 * Global Web Components Setup
 *
 * This file imports and registers all HTML web components
 * for use in Storybook stories.
 */

// Import all web components
import '../../ripple-ui-core/src/components/alert/html/RplAlert.ts'
// Add more web component imports here as they are created
// import '../../ripple-ui-core/src/components/modal/html/RplModal.ts'
// import '../../ripple-ui-core/src/components/accordion/html/RplAccordion.ts'

// Log when setup is complete
console.debug('[Ripple Web Components] All components registered')

export {}
