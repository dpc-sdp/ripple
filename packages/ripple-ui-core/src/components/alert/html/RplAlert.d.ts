/**
 * Type definitions for RplAlert Web Component
 */

export interface RplAlertDismissEvent extends CustomEvent {
  detail: {
    id: string
    action: 'close'
    label: string
    text: string
  }
}

export interface RplAlertElement extends HTMLElement {
  /**
   * Programmatically dismiss the alert
   */
  dismiss(): void

  /**
   * Check if the alert is dismissed
   */
  readonly dismissed: boolean

  /**
   * Alert identifier
   */
  dataset: {
    alertId?: string
    message?: string
    dismissed?: string
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rpl-alert': RplAlertElement
  }

  interface HTMLElementEventMap {
    'rpl-alert:dismiss': RplAlertDismissEvent
  }
}

export {}
