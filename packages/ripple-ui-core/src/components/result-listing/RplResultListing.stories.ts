import type { Meta, StoryObj } from '@storybook/vue3'
import RplResultListing from './RplResultListing.vue'
import RplResultListingItem from './RplResultListingItem.vue'
import RplSearchResult from './RplSearchResult.vue'
import RplList from '../list/RplList.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplFile from '../file/RplFile.vue'

const Template = (args: any) => ({
  components: {
    RplResultListing,
    RplResultListingItem,
    RplSearchResult,
    RplList,
    RplIcon,
    RplFile
  },
  setup() {
    return { args }
  },
  template: `
    <div class="rpl-storybook__page-content">
      <RplResultListing>
        <RplResultListingItem v-for="index of 3" :key="index">
          <RplSearchResult v-bind="args">
            <template v-if="args.meta" #meta>
              ${args.meta}
            </template>
            <template v-if="args.details" #details>
              ${args.details}
            </template>
          </RplSearchResult>
        </RplResultListingItem>
      </RplResultListing>
    </div>
  `
})

export default {
  title: 'Core/Navigation/Result listing',
  component: RplResultListing,
  render: Template,
  args: {
    title: 'The page title',
    url: 'https://www.vic.gov.au/victorian-government-directory',
    content:
      'Adipisicing aliquip culpa dolor proident enim et tempor anim elit occaecat fugiat do <em>volar</em> consectetur.',
    updated: '22 Dec 2022'
  }
} satisfies Meta<typeof RplSearchResult>

type Story = StoryObj<typeof RplSearchResult>

export const DefaultStory: Story = {
  name: 'Default'
}

export const Simple: Story = {
  args: {
    title: 'The page title',
    url: 'https://www.vic.gov.au/victorian-government-directory',
    content: null,
    updated: null,
    meta: `<span class="rpl-result-listing__topic">Topic</span><span class="rpl-result-listing__published">10 Aug 2022</span>`
  }
}

export const WithMeta: Story = {
  args: {
    meta: '<span class="rpl-result-listing__topic">Topic</span><span class="rpl-result-listing__published">10 Aug 2022</span>'
  }
}

export const WithDetails: Story = {
  args: {
    details: `<RplList :items="[
      { text: 'Department', icon: 'icon-user-circle-filled' },
      { text: '$10,000 - $20,000', icon: 'icon-dollar-circle-filled' },
      { text: 'Closed', icon: 'icon-cancel-circle-filled', iconColour: 'error' }
    ]" />`
  }
}

export const WithDetailsFile: Story = {
  name: 'With details (file)',
  args: {
    updated: null,
    showUrl: false,
    details: `<RplFile size="1.5mb" extension="pdf" updated="July 17, 2022" icon-size="s" />`
  }
}

export const WithCustomDateLabel: Story = {
  args: {
    dateLabel: 'Custom label'
  }
}

export const WithNoDateLabel: Story = {
  args: {
    dateLabel: null,
    updated: 'Some custom text'
  }
}
