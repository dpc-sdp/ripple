import type { Meta, StoryObj } from '@storybook/vue3'
import RplLayout from './RplLayout.vue'
import RplPageComponent from './RplPageComponent.vue'
import RplSidebarComponent from './RplSidebarComponent.vue'
import RplCardGrid from './RplCardGrid.vue'
import sbSpacer from './../../../stories/components/spacer.vue'

export default {
  title: 'Core/Layout',
  component: RplLayout,
  parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof RplLayout>

type Story = StoryObj<typeof RplLayout>

export const FullWidth: Story = {
  render: (args: any) => ({
    components: {
      RplLayout,
      RplPageComponent,
      RplSidebarComponent,
      RplCardGrid,
      sbSpacer
    },
    setup() {
      return { args }
    },
    template: `
      <RplLayout v-bind="args" >
        <template #aboveHeader>
          <sb-spacer color="pink">#aboveHeader - Alerts go here</sb-spacer>
        </template>
        <template #primaryNav>
          <sb-spacer color="lightblue">#header - Primary nav goes here</sb-spacer>
        </template>
        <template #breadcrumbs>
          <sb-spacer color="lightgreen">#breadcrumbs - Breadcrumbs go here</sb-spacer>
        </template>
        <template #aboveBody>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Campaign banner goes here</sb-spacer>
          </RplPageComponent>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Other banner goes here</sb-spacer>
          </RplPageComponent>
        </template>
        <template #body="{ hasSidebar }">
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplCardGrid :hasSidebar="hasSidebar">
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
          </RplCardGrid>
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
        </template>
        <template #belowBody>
          <sb-spacer color="lightyellow">#belowBody - Content rating form goes here</sb-spacer>
        </template>
        <template #footer>
          <sb-spacer color="aqua">#footer - Site footer goes here</sb-spacer>
        </template>
      </RplLayout>
    `
  })
}

export const WithSidebar: Story = {
  render: (args: any) => ({
    components: {
      RplLayout,
      RplPageComponent,
      RplSidebarComponent,
      RplCardGrid,
      sbSpacer
    },
    setup() {
      return { args }
    },
    template: `
      <RplLayout v-bind="args">
        <template #aboveHeader>
          <sb-spacer color="pink">#aboveHeader - Alerts go here</sb-spacer>
        </template>
        <template #primaryNav>
          <sb-spacer color="lightblue">#header - Primary nav goes here</sb-spacer>
        </template>
        <template #breadcrumbs>
          <sb-spacer color="lightgreen">#breadcrumbs - Breadcrumbs go here</sb-spacer>
        </template>
        <template #aboveBody>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Campaign banner goes here</sb-spacer>
          </RplPageComponent>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Other banner goes here</sb-spacer>
          </RplPageComponent>
        </template>
        <template #body="{ hasSidebar }">
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplCardGrid :hasSidebar="hasSidebar">
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
            <RplPageComponent>
              <sb-spacer color="peachpuff">
                #body card
              </sb-spacer>
            </RplPageComponent>
          </RplCardGrid>
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
        </template>
        <template #sidebar>
          <RplSidebarComponent>
            <sb-spacer color="lavender">#sidebar - Sidebar goes here</sb-spacer>
          </RplSidebarComponent>
          <RplSidebarComponent>
            <sb-spacer color="lavender">#sidebar - Sidebar goes here</sb-spacer>
          </RplSidebarComponent>
          <RplSidebarComponent>
            <sb-spacer color="lavender">#sidebar - Sidebar goes here</sb-spacer>
          </RplSidebarComponent>
        </template>
        <template #belowBody>
          <sb-spacer color="lightyellow">#belowBody - Content rating form goes here</sb-spacer>
        </template>
        <template #footer>
          <sb-spacer color="aqua">#footer - Site footer goes here</sb-spacer>
        </template>
      </RplLayout>
    `
  })
}

export const BackToTopAndSkipLinks: Story = {
  name: 'Back to top and skip links',
  render: (args: any) => ({
    components: {
      RplLayout,
      RplPageComponent,
      RplSidebarComponent,
      RplCardGrid,
      sbSpacer
    },
    setup() {
      return { args }
    },
    template: `
      <RplLayout v-bind="args">
        <template #aboveHeader>
          <sb-spacer color="pink">#aboveHeader - Alerts go here <a href="#">Link to demonstrate skip links</a>
          </sb-spacer>
        </template>
        <template #primaryNav>
          <sb-spacer color="lightblue">#header - Primary nav goes here</sb-spacer>
        </template>
        <template #breadcrumbs>
          <sb-spacer color="lightgreen">#breadcrumbs - Breadcrumbs go here</sb-spacer>
        </template>
        <template #aboveBody>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Campaign banner goes here <a href="#">Link to demonstrate skip
              links</a></sb-spacer>
          </RplPageComponent>
          <RplPageComponent :fullWidth="true">
            <sb-spacer color="lightsalmon">#aboveBody - Other banner goes here</sb-spacer>
          </RplPageComponent>
        </template>
        <template #body="{ hasSidebar }">
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="peachpuff">
              #body card
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="mistyrose" :height="4000">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
          <RplPageComponent>
            <sb-spacer color="mistyrose">
              #body components go here, they are really long and take up lots of space
            </sb-spacer>
          </RplPageComponent>
        </template>
        <template #belowBody>
          <sb-spacer color="lightyellow">#belowBody - Content rating form goes here</sb-spacer>
        </template>
        <template #footer>
          <sb-spacer color="aqua" :height="200">#footer - Site footer goes here</sb-spacer>
        </template>
      </RplLayout>
    `
  })
}
