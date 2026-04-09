export class RplAccordion extends HTMLElement {
  private toggleAllButton: HTMLButtonElement | null = null
  private itemButtons: HTMLButtonElement[] = []

  connectedCallback() {
    this.toggleAllButton = this.querySelector('[data-accordion-toggle-all]')
    this.itemButtons = Array.from(
      this.querySelectorAll<HTMLButtonElement>('[data-accordion-toggle]')
    )

    if (this.toggleAllButton) {
      this.toggleAllButton.addEventListener('click', this.handleToggleAll)
    }

    this.itemButtons.forEach((button) => {
      button.addEventListener('click', this.handleToggleItem)
      this.syncItemState(button)
    })

    this.updateToggleAllLabel()
  }

  disconnectedCallback() {
    if (this.toggleAllButton) {
      this.toggleAllButton.removeEventListener('click', this.handleToggleAll)
    }

    this.itemButtons.forEach((button) => {
      button.removeEventListener('click', this.handleToggleItem)
    })
  }

  private handleToggleAll = () => {
    const shouldExpand = !this.areAllExpanded()

    this.itemButtons.forEach((button) => {
      this.setItemExpanded(button, shouldExpand)
    })

    this.updateToggleAllLabel()
  }

  private handleToggleItem = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement
    const expanded = button.getAttribute('aria-expanded') === 'true'

    this.setItemExpanded(button, !expanded)
    this.updateToggleAllLabel()
  }

  private areAllExpanded() {
    return (
      this.itemButtons.length > 0 && this.itemButtons.every(this.isExpanded)
    )
  }

  private isExpanded = (button: HTMLButtonElement) =>
    button.getAttribute('aria-expanded') === 'true'

  private syncItemState(button: HTMLButtonElement) {
    this.setItemExpanded(button, this.isExpanded(button))
  }

  private setItemExpanded(button: HTMLButtonElement, expanded: boolean) {
    const contentId = button.getAttribute('aria-controls')

    if (!contentId) {
      return
    }

    const content = this.querySelector<HTMLElement>(`#${contentId}`)
    const item = button.closest<HTMLElement>('.rpl-accordion__item')

    button.setAttribute('aria-expanded', expanded ? 'true' : 'false')

    if (content) {
      content.hidden = !expanded

      if (expanded) {
        content.removeAttribute('aria-hidden')
        content.classList.add('rpl-expandable--open')
        content.classList.add('rpl-expandable--start-expanded')
      } else {
        content.setAttribute('aria-hidden', 'true')
        content.classList.remove('rpl-expandable--open')
        content.classList.remove('rpl-expandable--start-expanded')
      }
    }

    item?.classList.toggle('rpl-accordion__item--active', expanded)
  }

  private updateToggleAllLabel() {
    if (!this.toggleAllButton) {
      return
    }

    this.toggleAllButton.textContent = this.areAllExpanded()
      ? 'Close all'
      : 'Open all'
  }
}

if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('rpl-accordion')) {
    customElements.define('rpl-accordion', RplAccordion)
  }
}

export default RplAccordion
