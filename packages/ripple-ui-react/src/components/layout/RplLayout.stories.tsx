import type { Meta, StoryObj } from '@storybook/react-vite'
import { RplLayout } from './RplLayout'

const Placeholder = ({
  title,
  tone,
  minHeight = 96,
  children
}: {
  title: string
  tone: string
  minHeight?: number
  children?: React.ReactNode
}) => (
  <div
    style={{
      background: tone,
      borderRadius: 16,
      minHeight,
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.04) inset'
    }}
  >
    <strong style={{ display: 'block', marginBottom: '0.75rem' }}>
      {title}
    </strong>
    {children}
  </div>
)

const meta = {
  title: 'Components/Layout',
  component: RplLayout,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof RplLayout>

export default meta

type Story = StoryObj<typeof meta>

const LayoutStory = (args: Story['args']) => (
  <RplLayout {...args}>
    <RplLayout.AboveHeader>
      <Placeholder title='Above header' tone='hsl(329 100% 94%)'>
        Alerts and global banners live here.
      </Placeholder>
    </RplLayout.AboveHeader>

    <RplLayout.Header>
      <Placeholder title='Header / Primary nav' tone='hsl(203 100% 92%)'>
        Branding, navigation and search go here.
      </Placeholder>
    </RplLayout.Header>

    <RplLayout.Breadcrumbs>
      <Placeholder title='Breadcrumbs' tone='hsl(132 64% 91%)' minHeight={72}>
        Home / Section / Page
      </Placeholder>
    </RplLayout.Breadcrumbs>

    <RplLayout.AboveBody>
      {({ hasBreadcrumbs }) => (
        <Placeholder title='Above body' tone='hsl(24 100% 92%)'>
          {`Campaign banners, page messages and shared calls to action. Breadcrumbs visible: ${String(hasBreadcrumbs)}.`}
        </Placeholder>
      )}
    </RplLayout.AboveBody>

    <RplLayout.Body>
      {({ hasSidebar }) => (
        <>
          <Placeholder
            title='Main content'
            tone='hsl(350 100% 96%)'
            minHeight={180}
          >
            The main content area stays in the same grid column structure as the
            Vue layout.
          </Placeholder>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: hasSidebar
                ? 'repeat(2, minmax(0, 1fr))'
                : 'repeat(3, minmax(0, 1fr))',
              gap: '1rem'
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <Placeholder
                key={index}
                title={`Card ${index + 1}`}
                tone='hsl(35 100% 90%)'
                minHeight={120}
              >
                Card content
              </Placeholder>
            ))}
          </div>
        </>
      )}
    </RplLayout.Body>

    <RplLayout.Sidebar>
      <Placeholder title='Sidebar' tone='hsl(258 100% 94%)' minHeight={220}>
        Supporting navigation, related links and contextual widgets.
      </Placeholder>
    </RplLayout.Sidebar>

    <RplLayout.BelowBody>
      <Placeholder title='Below body' tone='hsl(55 100% 89%)' minHeight={84}>
        Content rating forms, related resources or feedback.
      </Placeholder>
    </RplLayout.BelowBody>

    <RplLayout.Footer>
      <Placeholder title='Footer' tone='hsl(186 100% 90%)' minHeight={104}>
        Site footer content.
      </Placeholder>
    </RplLayout.Footer>
  </RplLayout>
)

export const Default: Story = {
  args: {
    background: 'default',
    sideBarPlacement: 'right',
    showBackToTop: true
  },
  render: (args) => LayoutStory(args)
}

export const SidebarOnLeft: Story = {
  args: {
    background: 'alt',
    sideBarPlacement: 'left',
    showBackToTop: true
  },
  render: (args) => LayoutStory(args)
}

export const WithoutBackToTop: Story = {
  args: {
    background: 'default',
    sideBarPlacement: 'right',
    showBackToTop: false
  },
  render: (args) => LayoutStory(args)
}
