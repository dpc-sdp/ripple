import RplFormDropDown from './RplFormDropdown.vue'
import { RplFormDropdownOptions } from './fixtures/sample'

const props = {
  id: 'dropdown',
  labelId: 'dropdown',
  placeholder: 'Select',
  options: RplFormDropdownOptions
}

const input = '.rpl-form-dropdown-input'
const menu = '.rpl-form-dropdown-menu'
const search = '.rpl-form-dropdown-search__input'
const option = '.rpl-form-dropdown-option'
const toggle = '.rpl-form-dropdown-input__toggle'
const moreLabel = '.rpl-form-dropdown__more-label'
const tagItem = '.rpl-form-dropdown__multi-value-tag-item:not([aria-hidden])'

describe('RplFormDropDown', () => {
  it('mounts', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get('.rpl-form-dropdown').should('be.visible')
  })

  it('can be toggled open and closed', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).click()
    cy.get(menu).should('be.visible')
    cy.get(input).click()
    cy.get(menu).should('not.exist')
  })

  it('allows for single options to be selected', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).click()
    cy.get(option).contains('Apple').click()
    cy.get(input).should('contain', 'Apple')

    cy.get(input).click()
    cy.get(option).contains('Orange').click()
    cy.get(input).should('contain', 'Orange')
  })

  it('allows for multiple options to be selected', () => {
    cy.mount(RplFormDropDown, { props: { ...props, multiple: true } })

    cy.get(input).click()
    cy.get(option).contains('Apple').click()
    cy.get(option).contains('Orange').click()

    cy.get(input).should(($div) => {
      expect($div.get(0).innerText).to.eq('Apple, Orange')
    })
  })

  it('correctly displays the number of hidden selected options', () => {
    cy.viewport(960, 680)
    cy.mount(RplFormDropDown, { props: { ...props, multiple: true } })
    cy.get(input).click()
    cy.get(option).click({ multiple: true })
    cy.get(moreLabel).contains('+2 more')

    cy.viewport(746, 680)
    cy.get(moreLabel).contains('+5 more')

    cy.viewport(480, 680)
    cy.get(moreLabel).contains('+8 more')

    cy.viewport(370, 680)
    cy.get(moreLabel).contains('+10 more')
  })

  it('can be "searched" by typing from the input', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).type('b')
    cy.focused().contains('Banana')

    cy.get(input).type('bl')
    cy.focused().contains('Blueberries')
  })

  it('can be "searched" by typing from an option', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).click()
    cy.get(option).first().type('apr')
    cy.focused().contains('Apricots')

    cy.get(option).first().type('l')
    cy.focused().contains('Lemon')
  })

  it('can be "traversed" by cycling through a single key stroke', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).type('a')
    cy.focused().contains('Apple')

    cy.focused().type('a')
    cy.focused().contains('Apricots')

    cy.focused().type('a')
    cy.focused().contains('Avocado')

    cy.focused().type('a')
    cy.focused().contains('Apple')
  })

  it('can be navigated using the keyboard', () => {
    cy.mount(RplFormDropDown, { props })

    cy.get(input).focus()
    cy.focused().type('{downarrow}')
    cy.get(menu).should('be.visible')
    cy.focused().contains('Select')

    // Options list can be cycled through
    cy.focused().type('{downarrow}{downarrow}')
    cy.focused().contains('Banana')
    cy.focused().type('{uparrow}')
    cy.focused().contains('Apple')
    cy.focused().type('{uparrow}')
    cy.focused().contains('Select')
    cy.focused().type('{uparrow}')
    cy.focused().contains('Select')
    cy.focused().type('{esc}')
    cy.get(menu).should('not.exist')
  })

  /* Searchable dropdowns (single) */
  it('single select can be searched', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).click()

    cy.get(search).should('have.focus')
    cy.get(menu).should('be.visible')
    cy.get(option).should('have.length', 13)

    cy.get(search).type('ap')
    cy.get(option).should('have.length', 4)
    cy.get(option).each(($el) => {
      expect($el.text().toLowerCase()).to.contain('ap')
    })
  })

  it('selecting a single option populates the search input', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).click()
    cy.get(option).contains('Orange').click()
    cy.get(input).contains('Orange')
    cy.get(input).click()
    cy.get(search).should('have.value', 'Orange')
    cy.get(option).contains('Peach').click()
    cy.get(input).contains('Peach')
    cy.get(input).click()
    cy.get(search).should('have.value', 'Peach')
  })

  it('a partially cleared selected input with be restored when dropdown is closed', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).click()
    cy.get(option).contains('Lemon').click()

    cy.get(input).click()
    cy.get(option).should('have.length', 13)
    cy.get(search).type('{backspace}{backspace}{backspace}')
    cy.get(search).should('have.value', 'Le')

    cy.get(option).should('have.length', 3)
    cy.get(option).each(($el) => {
      expect($el.text().toLowerCase()).to.contain('le')
    })

    cy.get(toggle).click()
    cy.get(input).contains('Lemon')
    cy.get(toggle).click()
    cy.get(search).should('have.value', 'Lemon')
  })

  it('a completely cleared selected input will remove the selected value', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).click()
    cy.get(option).contains('Lemon').click()
    cy.get(input).contains('Lemon')

    cy.get(input).click()
    cy.get(search).clear()
    cy.get(option).should('have.length', 13)
    cy.get(toggle).click()
    cy.get(input).contains('Select')
  })

  it('a no results message is displayed', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).focus()
    cy.focused().type('...')
    cy.get(menu).contains('No results found')
  })

  it('a single matching result will be auto selected on enter', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).click()
    cy.focused().type('pea{enter}')
    cy.get(input).contains('Peach')
  })

  it('single select can be navigated using the keyboard', () => {
    cy.mount(RplFormDropDown, { props: { ...props, searchable: true } })

    cy.get(input).focus()
    cy.focused().type('{downarrow}')
    cy.get(search).should('have.focus')
    cy.focused().type('{downarrow}{downarrow}')
    cy.focused().contains('Banana')
    cy.focused().type('{uparrow}')
    cy.focused().contains('Apple')
    cy.focused().type('{uparrow}')
    cy.get(search).should('have.focus')
    cy.focused().type('{esc}')
    cy.get(menu).should('not.exist')
  })

  /* Searchable dropdowns (multi) */
  it('multi select can be searched', () => {
    cy.mount(RplFormDropDown, {
      props: { ...props, multiple: true, searchable: true }
    })

    cy.get(input).click()

    cy.get(search).should('have.focus')
    cy.get(menu).should('be.visible')
    cy.get(option).should('have.length', 13)

    cy.get(search).type('be')
    cy.get(option).should('have.length', 2)
    cy.get(option).each(($el) => {
      expect($el.text().toLowerCase()).to.contain('be')
    })
    cy.get(toggle).click()

    cy.get(toggle).click()
    cy.get(option).should('have.length', 13)
  })

  it('selecting multiple options populates the the tag list', () => {
    cy.viewport(480, 680)
    cy.mount(RplFormDropDown, {
      props: { ...props, multiple: true, searchable: true }
    })

    const selection = [
      'Apple',
      'Banana',
      'Orange',
      'Blueberries',
      'Peach',
      'Lemon'
    ]

    cy.get(input).click()

    selection.forEach((item) => {
      cy.get(option).contains(item).click()
    })

    // The search input should remain visible
    cy.get(search).then(($el) => {
      const rect = $el[0].getBoundingClientRect()
      const windowHeight = Cypress.config('viewportHeight')
      const windowWidth = Cypress.config('viewportWidth')

      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth

      expect(isVisible).to.be.true
    })

    // The full tag list is displayed while the dropdown is open
    selection.forEach((item) => {
      cy.get(tagItem).contains(item)
    })
  })

  it('displays tags with the number of hidden selected options when closed', () => {
    cy.viewport(960, 680)
    cy.mount(RplFormDropDown, {
      props: {
        ...props,
        multiple: true,
        searchable: true,
        options: [
          {
            id: 'bullace',
            value: 'bullace',
            label: 'Bullace damson plum'
          },
          ...RplFormDropdownOptions
        ]
      }
    })

    cy.get(input).click()
    cy.get(option).click({ multiple: true })
    cy.get(toggle).click()

    cy.get(moreLabel).contains('+7 more')

    cy.viewport(746, 680)
    cy.get(moreLabel).contains('+9 more')

    cy.viewport(480, 680)
    cy.get(moreLabel).contains('+12 more')

    cy.viewport(370, 680)
    cy.get(moreLabel).contains('14 items')
  })

  it('options can be managed via the tag list', () => {
    cy.mount(RplFormDropDown, {
      props: {
        ...props,
        multiple: true,
        searchable: true
      }
    })

    // Select some options
    const selection = ['Apple', 'Banana', 'Orange', 'Peach']

    cy.get(input).click()

    selection.forEach((item) => {
      cy.get(option).contains(item).click()
    })

    cy.get(toggle).click()

    cy.get(tagItem).should('have.length', 4)

    selection.forEach((item) => {
      cy.get(tagItem).contains(item)
    })

    // Remove some options
    cy.get(tagItem).contains('Banana').click()
    cy.get(tagItem).contains('Orange').click()

    cy.get(tagItem).should('not.contain', 'Banana')
    cy.get(tagItem).should('not.contain', 'Orange')
    cy.get(tagItem).should('contain', 'Apple')
    cy.get(tagItem).should('contain', 'Peach')

    cy.get(tagItem).contains('Apple').click()
    cy.get(tagItem).contains('Peach').click()

    cy.get(input).contains('Select')
  })

  it('pressing delete on the multi select will auto select the last tag for deletion', () => {
    cy.mount(RplFormDropDown, {
      props: { ...props, searchable: true, multiple: true }
    })

    cy.get(input).click()
    cy.get(option).eq(0).click()
    cy.get(toggle).click()

    // Pressing delete on an empty input focuses tags
    cy.get(input).focus()
    cy.focused().type('{del}')
    cy.focused().contains('Apple')

    // Focus returns to input when all tags are removed
    cy.focused().type('{del}')
    cy.get(search).should('have.focus')
  })

  it('multi select can be navigated using the keyboard', () => {
    cy.mount(RplFormDropDown, {
      props: { ...props, searchable: true, multiple: true }
    })

    cy.get(input).focus()
    cy.focused().type('{downarrow}')
    cy.get(search).should('have.focus')

    // Select options
    cy.focused().type('{downarrow}')
    cy.focused().type('{enter}')
    cy.focused().type('{downarrow}')
    cy.focused().type('{enter}')
    cy.focused().type('{downarrow}')
    cy.focused().type('{enter}')

    // Return to search
    cy.focused().type('{uparrow}{uparrow}{uparrow}')
    cy.get(search).should('have.focus')

    // Manage tags
    cy.focused().type('{leftarrow}')
    cy.focused().contains('Orange')
    cy.focused().type('{leftarrow}')
    cy.focused().contains('Banana').type('{del}')
    cy.focused().contains('Apple')
    cy.focused().type('{leftarrow}')
    cy.focused().contains('Apple')
    cy.focused().type('{rightarrow}')
    cy.focused().contains('Orange')
    cy.focused().type('{rightarrow}')
    cy.get(search).should('have.focus')
  })
})
