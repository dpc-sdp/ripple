import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
// @ts-ignore - Vite handles this
import template from './RplAlert.twig'
// Import and register the web component
import './RplAlert.ts'

export default {
  title: 'HTML/Content/Alert',
  tags: ['autodocs'],
  decorators: [(story) => `<div style="width: 100%;">${story()}</div>`],
  argTypes: {
    variant: {
      control: 'select',
      options: ['information', 'warning', 'error'],
      description: 'The visual variant of the alert'
    },
    icon_name: {
      control: 'text',
      description: 'Icon identifier (defaults based on variant if not provided)'
    },
    message: {
      control: 'text',
      description: 'The alert message text'
    },
    link_text: {
      control: 'text',
      description: 'Optional link text'
    },
    link_url: {
      control: 'text',
      description: 'Optional link URL'
    },
    alert_id: {
      control: 'text',
      description: 'Unique identifier for the alert'
    },
    is_dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed'
    },
    dismissed: {
      control: 'boolean',
      description: 'Initial dismissed state'
    }
  },
  args: {
    variant: 'information',
    message: 'This is an alert message',
    alert_id: 'alert-1',
    is_dismissible: true,
    dismissed: false
  }
} satisfies Meta

type Story = StoryObj

export const Information: Story = {
  args: {
    variant: 'information',
    message: 'This is an information alert with important details.',
    alert_id: 'alert-info'
  },
  render: (args: any) => renderTwig(template, args)
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'This is a warning alert that requires attention.',
    alert_id: 'alert-warning'
  },
  render: (args: any) => renderTwig(template, args)
}

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'This is an error alert indicating a problem.',
    alert_id: 'alert-error'
  },
  render: (args: any) => renderTwig(template, args)
}

export const WithLink: Story = {
  args: {
    variant: 'information',
    message: 'This alert includes a link for more information.',
    link_text: 'Learn more',
    link_url: 'https://www.vic.gov.au',
    alert_id: 'alert-with-link'
  },
  render: (args: any) => renderTwig(template, args)
}

export const NotDismissible: Story = {
  args: {
    variant: 'warning',
    message: 'This alert cannot be dismissed by the user.',
    is_dismissible: false,
    alert_id: 'alert-not-dismissible'
  },
  render: (args: any) => renderTwig(template, args)
}

export const CustomIcon: Story = {
  args: {
    variant: 'information',
    message: 'This alert uses a custom icon.',
    icon_name: 'icon-pin',
    alert_id: 'alert-custom-icon'
  },
  render: (args: any) => renderTwig(template, args)
}

export const LongMessage: Story = {
  args: {
    variant: 'information',
    message:
      'This is a much longer alert message that demonstrates how the component handles multiple lines of text. It should wrap properly and maintain good readability across different screen sizes.',
    link_text: 'Read the full documentation',
    link_url: 'https://www.vic.gov.au',
    alert_id: 'alert-long'
  },
  render: (args: any) => renderTwig(template, args)
}

export const MultipleAlerts: Story = {
  render: () => {
    return `
      <div class="rpl-alert-container">
        ${renderTwig(template, {
          variant: 'information',
          message: 'First information alert',
          alert_id: 'alert-multi-1',
          is_dismissible: true
        })}
        ${renderTwig(template, {
          variant: 'warning',
          message: 'Second warning alert',
          alert_id: 'alert-multi-2',
          is_dismissible: true
        })}
        ${renderTwig(template, {
          variant: 'error',
          message: 'Third error alert',
          alert_id: 'alert-multi-3',
          is_dismissible: true
        })}
      </div>
    `
  }
}

export const InteractiveDemo: Story = {
  args: {
    variant: 'information',
    message: 'Click the close button to dismiss this alert',
    alert_id: 'alert-interactive'
  },
  render: (args: any) => {
    const html = renderTwig(template, args)

    // Verify web component is registered
    setTimeout(() => {
      const isRegistered = customElements.get('rpl-alert')
      if (!isRegistered) {
        console.error('[RplAlert Story] Web component not registered!')
      } else {
        console.log('[RplAlert Story] Web component is registered ✓')
      }

      const alert = document.querySelector(
        '[data-alert-id="alert-interactive"]'
      )
      if (alert) {
        // Add event listener to demonstrate functionality
        alert.addEventListener('rpl-alert:dismiss', ((e: CustomEvent) => {
          console.log('[RplAlert Story] Alert dismissed:', e.detail)
          // Show a notification in the Actions panel
          alert.dispatchEvent(
            new CustomEvent('action', {
              detail: { name: 'dismissed', args: [e.detail] }
            })
          )
        }) as EventListener)

        console.log('[RplAlert Story] Event listener attached ✓')
      }
    }, 100)

    return html
  }
}

export const WebComponentTest: Story = {
  render: () => {
    const testId = `test-${Date.now()}`
    const html = renderTwig(template, {
      variant: 'information',
      message: 'Testing web component functionality. Check console for logs.',
      alert_id: testId,
      is_dismissible: true
    })

    setTimeout(() => {
      const alert = document.querySelector(`[data-alert-id="${testId}"]`) as any

      if (alert && typeof alert.dismiss === 'function') {
        console.log('✓ Web component methods available')
        console.log('✓ dismiss() method:', typeof alert.dismiss)
        console.log('✓ dismissed property:', alert.dismissed)

        // Test event emission
        alert.addEventListener('rpl-alert:dismiss', ((e: CustomEvent) => {
          console.log('✓ Event emitted successfully:', e.detail)
        }) as EventListener)
      } else {
        console.error('✗ Web component not properly initialized')
      }
    }, 100)

    return html
  }
}
