import RplButton from './../button/index.vue'
import { rplEventBus } from './../../index'

rplEventBus.on('rpl-button/click', () => {
  console.log(`DATALAYER PUSH EXAMPLE`, rplEventBus.find('rpl-button/click'))
})

export default {
  title: 'Example/EventBus',
  component: RplButton
}
// TODO: This story is probably irrelevant once we have demonstrated it. We should remove it eventually.
export const DataLayerDemo = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RplButton },
  template: `<rpl-button />`,
  argTypes: { onClick: { action: 'clicked' } }
})
