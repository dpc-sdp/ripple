import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplAvatarCard from './RplAvatarCard.vue'
import RplTag from '../tag/RplTag.vue'

type ExtendedAvatarCard = Partial<typeof RplAvatarCard> & {
  number: 1 | 2 | 4 | 8
}

export default {
  title: 'Core/Navigation/Card',
  component: RplAvatarCard,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    },
    meta: {
      control: { type: 'select' },
      options: ['', '<RplTag variant="neutral" label="Profile"></RplTag>']
    }
  }
} satisfies Meta<ExtendedAvatarCard>

type Story = StoryObj<ExtendedAvatarCard>

export const Avatar: Story = {
  args: {
    number: 1,
    url: 'https://www.vic.gov.au',
    meta: '<RplTag variant="neutral" label="Profile"></RplTag>',
    title: 'Mary Sherman Morgan',
    default: 'America’s first female rocket scientist.'
  },
  render: (args: any) => ({
    components: { RplAvatarCard, RplTag },
    setup() {
      const img = {
        src: svgPlaceholder({
          width: 220,
          height: 220,
          bgColor: '#da7',
          fgColor: '#333'
        })
      }
      return { args, img }
    },
    template: `
      <ul class="rpl-storybook__page rpl-grid">
        <RplAvatarCard
          v-for="index of args.number"
          :key="index"
          el="li"
          v-bind="args"
          class="rpl-col-12 rpl-col-6-m rpl-col-4-l"
          :image="img"
          url="${args.url}"
          title="${args.title}"
        >
          <template #meta>
            ${args.meta}
          </template>
          ${args.default}
        </RplAvatarCard>
      </ul>
    `
  })
}
