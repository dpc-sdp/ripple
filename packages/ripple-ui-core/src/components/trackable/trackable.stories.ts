// Button.stories.js|jsx|ts|tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RplButton from './../button/index.vue'
import { rplEventBus } from './../../index'

rplEventBus.on('rpl-button/click', () => {
  console.log(`DATALAYER PUSH EXAMPLE`, rplEventBus.find('rpl-button/click'))
})

export default {
  component: RplButton
}

export const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RplButton },
  template: `<rpl-button />`,
  argTypes: { onClick: { action: 'clicked' } }
})

export const WithDataLayer = Template.bind({})

WithDataLayer.args = {
  label: 'Primary with a really long name'
}
