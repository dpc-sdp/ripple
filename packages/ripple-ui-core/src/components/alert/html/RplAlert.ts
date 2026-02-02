/**
 * RplAlert Web Component
 *
 * A custom element that provides dismiss functionality and height animations
 * for alert messages. Works with server-rendered HTML from Twig templates.
 *
 * Features:
 * - Progressive enhancement (works without JavaScript)
 * - Smooth height transitions on dismiss
 * - Custom event emission for tracking
 * - Automatic height calculation on resize
 *
 * @example
 * ```html
 * <rpl-alert data-alert-id="alert-1" data-message="Important message">
 *   <!-- Alert content -->
 * </rpl-alert>
 * ```
 *
 * @fires rpl-alert:dismiss - Fired when alert is dismissed
 */
export class RplAlert extends HTMLElement {
  private closeButton: HTMLButtonElement | null = null
  private alertInner: HTMLElement | null = null
  private resizeObserver: ResizeObserver | null = null
  private isDismissed: boolean = false

  constructor() {
    super()
    this.isDismissed = this.dataset.dismissed === 'true'
  }

  connectedCallback() {
    // Query for DOM elements
    this.closeButton = this.querySelector('[data-dismiss]')
    this.alertInner = this.querySelector('.rpl-alert__inner')

    // Add event listener for dismiss button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.handleDismiss)
    }

    // Set initial height for animation
    this.updateHeight()

    // Observe height changes for responsive behavior
    this.setupResizeObserver()
  }

  disconnectedCallback() {
    // Clean up event listeners
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.handleDismiss)
    }

    // Clean up resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }

  /**
   * Set up ResizeObserver to track height changes
   * Mimics Vue's onResizeHeight composable behavior
   */
  private setupResizeObserver() {
    if (!this.alertInner || typeof ResizeObserver === 'undefined') {
      return
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateHeight()
    })

    this.resizeObserver.observe(this.alertInner)
  }

  /**
   * Update the container height CSS variable for smooth transitions
   */
  private updateHeight() {
    if (!this.alertInner || this.style.display === 'none') {
      return
    }

    const height = this.alertInner.offsetHeight
    this.style.setProperty('--local-container-height', `${height}px`)
  }

  /**
   * Handle dismiss button click
   */
  private handleDismiss = () => {
    if (this.isDismissed) {
      return
    }

    const alertId = this.dataset.alertId || ''
    const message = this.dataset.message || ''

    // Emit custom event for tracking/analytics
    this.dispatchEvent(
      new CustomEvent('rpl-alert:dismiss', {
        bubbles: true,
        composed: true,
        detail: {
          id: alertId,
          action: 'close',
          label: message,
          text: 'Dismiss alert'
        }
      })
    )

    // Mark as dismissed
    this.isDismissed = true
    this.dataset.dismissed = 'true'

    // Add CSS class for animation
    this.classList.add('rpl-alert--closed')

    // Optional: Remove from DOM after animation completes
    // Matches the CSS transition duration
    setTimeout(() => {
      if (this.alertInner) {
        this.alertInner.remove()
      }
    }, 300)
  }

  /**
   * Programmatic API to dismiss the alert
   */
  public dismiss() {
    this.handleDismiss()
  }

  /**
   * Check if alert is dismissed
   */
  public get dismissed(): boolean {
    return this.isDismissed
  }
}

// Auto-register the custom element if in browser environment
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('rpl-alert')) {
    customElements.define('rpl-alert', RplAlert)
    console.debug('[RplAlert] Web component registered')
  }
}

// Export for manual registration or testing
export default RplAlert
