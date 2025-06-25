import type { Meta, StoryObj } from '@storybook/vue3'
import RplContent from '../src/components/content/RplContent.vue'
import RplTextLink from '../src/components/text-link/RplTextLink.vue'

export default {
  title: 'Introduction'
} satisfies Meta

export const Introduction: StoryObj = {
  render: () => ({
    components: { RplContent, RplTextLink },
    template: `
      <RplContent>
        <img src="img/ripple-logo.svg" alt="" width="150" />
        <h2 class="rpl-type-h3">Welcome to Ripple Storybook</h2>
        <p>Storybook is used to test Ripple components in isolation and provide a place find
          out how a given component works. It is used when developing new components and modifying existing ones.</p>
      </RplContent>
    `
  })
}
