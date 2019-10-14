import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import RplForm from './index.vue'
import RplCheckbox from './Checkbox.vue'
import RplSelect from './RplSelect.vue'

const RplFormEventBus = new Vue()
export { RplFormEventBus }
export { VueFormGenerator }
export { RplCheckbox }
export { RplSelect }

export default RplForm
