import RplButton from './index.vue'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { rplEventBus } from './../../index'
import { parameters } from '../../../.storybook/preview'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: RplButton,
  decorators: [],
  parameters: {
    cssresources: []
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    theme: {
      control: { type: null },
      options: ['primary', 'secondary', 'tertiary']
    },
    iconName: {
      control: { type: 'select' }
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large']
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
  theme: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  theme: 'secondary'
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

export const PrimaryTheme1 = Template.bind({})
PrimaryTheme1.storyName = 'Themed / Primary'
PrimaryTheme1.args = {
  ...Primary.args
}

PrimaryTheme1.parameters = {
  cssresources: [
    {
      ...parameters.cssresources[0],
      picked: true
    }
  ]
}
