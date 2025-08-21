import type { Meta, StoryObj } from '@storybook/vue3'
import RplErrorMessage from './RplErrorMessage.vue'
import RplContent from '../content/RplContent.vue'

type ExtendedContentProps = Partial<typeof RplContent> & {
  content: string
}

export default {
  title: 'Core/Containers/Error message',
  component: RplErrorMessage
} satisfies Meta<ExtendedContentProps>

type Story = StoryObj<ExtendedContentProps>

export const ErrorMessage: Story = {
  args: {
    title: 'Error',
    intro: "Sorry, we couldn't find the page you were looking for.",
    link: {
      text: 'Go to home page',
      url: '/'
    },
    content: `<p>Have a look at the web address to make sure it was typed correctly.</p><p>We may also have deleted this page. If none of our suggestions help you find the information you were looking for, please contact us.</p>`
  },
  render: (args: any) => ({
    components: { RplErrorMessage, RplContent },
    setup() {
      return { args }
    },
    template: `
      <RplErrorMessage v-bind="args">
        <RplContent>${args.content}</RplContent>
      </RplErrorMessage>`
  })
}
