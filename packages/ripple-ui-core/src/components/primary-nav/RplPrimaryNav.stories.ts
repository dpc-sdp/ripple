import type { Meta, StoryObj } from '@storybook/vue3'
import RplPrimaryNav from './RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'

export default {
  title: 'Core/Navigation/Primary nav',
  component: RplPrimaryNav,
  parameters: { layout: 'fullscreen' },
  args: {
    primaryLogo: {
      href: '#',
      altText: 'Primary logo alt text'
    },
    items: RplPrimaryNavItems
  },
  decorators: [
    () => ({ template: '<story /><div style="height: 500px;"></div>' })
  ]
} satisfies Meta<typeof RplPrimaryNav>

type Story = StoryObj<typeof RplPrimaryNav>

export const DefaultStory: Story = {
  name: 'Default',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  }
}

export const WithPrimaryLogo: Story = {
  args: {
    primaryLogo: {
      href: '#',
      src: 'img/primary-nav-logo-primary.svg',
      printSrc: 'img/primary-nav-logo-primary-print.svg',
      altText: 'Primary logo alt text'
    }
  }
}

export const WithSecondaryLogo: Story = {
  args: {
    secondaryLogo: {
      href: '#',
      src: 'img/primary-nav-logo-secondary.svg',
      altText: 'Secondary logo alt text',
      printSrc: 'img/primary-nav-logo-secondary-print.svg'
    }
  }
}

export const WithCustomUserAction: Story = {
  args: {
    secondaryLogo: {
      href: '#',
      src: 'img/primary-nav-logo-secondary.svg',
      altText: 'Secondary logo alt text',
      printSrc: 'img/primary-nav-logo-secondary-print.svg'
    },
    items: [
      { id: '1', text: 'First link', url: '#' },
      { id: '1', text: 'Second link', url: '#' },
      { id: '1', text: 'Third link', url: '#' }
    ]
  },
  render: (args: any) => ({
    components: { RplPrimaryNav },
    setup() {
      return { args }
    },
    template: `
      <RplPrimaryNav v-bind="args">
        <template #userAction>
          <a
            class="rpl-type-label-small rpl-type-weight-bold rpl-u-focusable-block"
            href="/login"
            target="_blank"
          >
              <span class="rpl-u-margin-r-2">
                <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-user-circle-filled" style="transform: translateY(1px);">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4c1.9 0 3.5 1.6 3.5 3.5S13.9 11 12 11 8.5 9.4 8.5 7.5 10.1 4 12 4zm6 12.7c0 .7-.6 1.3-1.3 1.3H7.3c-.7 0-1.3-.6-1.3-1.3v-1.1c0-2 1.6-3.6 3.6-3.6h.4c.6.3 1.3.4 2 .4s1.4-.2 2-.4h.4c2 0 3.6 1.6 3.6 3.6v1.1z"></path>
                    <path d="M0 0h24v24H0z" style="fill: none;"></path>
                  </svg>
                </span>
              </span>
            &NoBreak;<span>Login</span>
          </a>
        </template>
      </RplPrimaryNav>
    `
  })
}

export const WithManyItems: Story = {
  args: {
    items: [
      ...RplPrimaryNavItems,
      { id: '100', text: 'First level X', url: '#' },
      { id: '101', text: 'First level Y', url: '#' },
      { id: '102', text: 'First level Z', url: '#' }
    ]
  }
}
