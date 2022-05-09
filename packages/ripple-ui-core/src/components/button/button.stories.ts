import RplButton from './index.vue'
import {
  RplButtonThemes,
  RplButtonTypes,
  RplButtonIconPositions
} from './constants'
import { RplIconNames } from './../icon/constants.js'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { rplEventBus } from './../../index'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: RplButton,
  decorators: [],
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: RplButtonTypes
    },
    theme: {
      control: { type: 'select' },
      options: RplButtonThemes,
      defaultValue: 'primary'
    },
    iconName: {
      control: { type: 'select' },
      options: [undefined, ...RplIconNames]
    },
    iconPosition: {
      control: { type: 'select' },
      options: RplButtonIconPositions
    },
    onClick: { action: 'clicked' }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton: RplButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  template: '<my-button @click="" v-bind="args" />'
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Button',
  type: 'filled',
  theme: 'primary'
}

export const Outlined = Template.bind({})
Outlined.args = {
  ...Primary.args,
  type: 'outlined'
}

export const White = Template.bind({})
White.args = {
  ...Primary.args,
  type: 'white'
}

export const Elevated = Template.bind({})
Elevated.args = {
  ...Primary.args,
  type: 'elevated'
}

// Test hover state
export const OnHover = Template.bind({})
OnHover.args = {
  ...Primary.args
}
OnHover.parameters = { pseudo: { hover: true } }

// Test Event Bus handler fires
export const EventBus = Template.bind({})
EventBus.args = {
  ...Primary.args
}
EventBus.play = async ({ canvasElement }) => {
  let fired = false
  rplEventBus.all.clear()
  const handler = () => {
    fired = !fired
  }
  rplEventBus.on('rpl-button/click', handler)
  const canvas = await within(canvasElement)
  await userEvent.click(canvas.getByRole('button'))
  await expect(fired).toBeTruthy()
  rplEventBus.off('rpl-button/click', handler)
}
