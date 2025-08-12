import type { Meta, StoryObj } from '@storybook/vue3'
import RplPrimaryNav from './RplPrimaryNav.vue'
import { RplPrimaryNavItems } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'
import RplIcon from '../icon/RplIcon.vue'
import RplLink from '../link/RplLink.vue'

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
    components: { RplPrimaryNav, RplLink, RplIcon },
    setup() {
      return { args }
    },
    template: `
      <RplPrimaryNav v-bind="args">
        <template #userAction>
          <RplLink
            class="rpl-primary-nav__icon-link rpl-type-label-small rpl-type-weight-bold rpl-u-focusable-block"
            url="/login"
          >
            <RplIcon name="icon-user-circle-filled" /><span>Login</span>
          </RplLink>
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
