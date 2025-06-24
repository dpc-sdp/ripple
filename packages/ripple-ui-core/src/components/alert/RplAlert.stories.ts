import type { Meta, StoryObj } from '@storybook/vue3'
import { reactive, ref } from 'vue'
import RplAlert from './RplAlert.vue'
import RplAlertsContainer from './RplAlertsContainer.vue'
import { RplIconNames } from '../icon/constants'
import { playFunction } from './RplAlert.play'

export default {
  title: 'Core/Containers/Alert',
  component: RplAlert,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['information', 'warning', 'error']
    },
    iconName: {
      control: { type: 'select' },
      options: RplIconNames
    }
  },
  args: {
    linkText: 'Find out more',
    linkUrl: '/'
  }
} satisfies Meta<typeof RplAlert>

type Story = StoryObj<typeof RplAlert>

export const Information: Story = {
  args: {
    variant: 'information',
    message: 'An informative message.',
    iconName: 'icon-information-circle-filled',
    alertId: 'info-1'
  }
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'A warning message.',
    iconName: 'icon-fire',
    alertId: 'fire-1'
  }
}

export const Danger: Story = {
  args: {
    variant: 'error',
    message: 'A critical message.',
    iconName: 'icon-exclamation-circle-filled',
    alertId: 'danger-1'
  }
}

export const Stacked: Story = {
  render: (args) => ({
    components: { RplAlert, RplAlertsContainer },
    setup() {
      const dismissed = reactive({
        information: false,
        warning: false,
        error: false
      })
      return {
        args,
        dismissed,
        onDismiss: ({ id }) => (dismissed[id] = !dismissed[id]),
        icons: [
          'icon-information-circle-filled',
          'icon-fire',
          'icon-exclamation-circle-filled'
        ],
        messages: [
          'An informative message.',
          'A warning message.',
          'A critical message.'
        ]
      }
    },
    template: `
      <RplAlertsContainer v-for="(alert, i) in Object.keys(dismissed)">
        <RplAlert
          v-bind="args"
          :message="messages[i]"
          :iconName="icons[i]"
          :key="'alert-' + i"
          :variant="alert"
          :alertId="alert"
          :dismissed="dismissed[alert]"
          @dismiss="onDismiss"
        />
      </RplAlertsContainer>`
  }),
  args: {
    variant: 'error',
    iconName: 'icon-exclamation-circle-filled'
  }
}

export const Dismissed: Story = {
  render: (args) => ({
    components: { RplAlert },
    setup() {
      let dismissed = ref(false)
      const onDismiss = () => (dismissed.value = !dismissed.value)

      return {
        args,
        dismissed,
        onDismiss
      }
    },
    template: `
      <RplAlert
        v-bind="args"
        :dismissed="dismissed"
        @dismiss="onDismiss"
      />`
  }),
  args: {
    variant: 'information',
    alertId: 'dismissed-id',
    message: 'An informative message.',
    iconName: 'icon-exclamation-circle-filled'
  },
  play: playFunction
}

export const WithoutCTA: Story = {
  args: {
    variant: 'warning',
    message: 'An example of an alert without the CTA.',
    alertId: 'no-cta',
    linkUrl: ''
  }
}
