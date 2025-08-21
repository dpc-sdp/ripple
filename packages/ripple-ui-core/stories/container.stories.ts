import { Meta, StoryObj } from '@storybook/vue3'

export default {
  title: 'Base Styles/Layout'
} satisfies Meta

export const Container: StoryObj = {
  render: () => ({
    template: `
    <div class="rpl-container">
      <span class="rpl-type-p">
        This container has a maximum width of 1200px and includes a margin to
        prevent content from touching the edges of the page.
      </span>
    </div>
  `
  })
}
