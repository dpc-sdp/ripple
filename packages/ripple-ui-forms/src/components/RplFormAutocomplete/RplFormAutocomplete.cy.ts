import { h } from 'vue'
import RplFormAutocomplete from './RplFormAutocomplete.vue'

const baseProps = {
  id: 'autocomplete',
  labelId: 'autocomplete-label',
  placeholder: 'Search for a fruit'
}

const _ = {
  input: '.rpl-form-autocomplete__input',
  menu: '.rpl-form-autocomplete__menu',
  option: '.rpl-form-autocomplete__menu-option',
  noResults: '.rpl-form-autocomplete__menu-noresults',
  clear: '[aria-label="Clear search"]'
}

const suggestions = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
  { id: 'date', label: 'Date' },
  { id: 'elderberry', label: 'Elderberry' },
  { id: 'fig', label: 'Fig' },
  { id: 'grape', label: 'Grape' }
]

const mount = (overrideProps: Record<string, any> = {}) => {
  return cy.mount(RplFormAutocomplete, {
    props: {
      getSuggestions: (input: string) =>
        Promise.resolve(
          suggestions.filter((f) =>
            f.label.toLowerCase().includes(input.toLowerCase())
          )
        ),
      ...baseProps,
      ...overrideProps
    }
  })
}

describe('RplFormAutocomplete', () => {
  it('renders with placeholder and correct initial state', () => {
    mount()

    cy.get(_.input).should('have.attr', 'placeholder', 'Search for a fruit')
    cy.get(_.menu).should('not.exist')
    cy.get(_.clear).should('not.exist')
  })

  it('has basic display options that can be configured', () => {
    mount({
      disabled: true,
      iconPosition: 'left',
      placeholder: 'Search to start'
    })

    cy.get(_.input).should('be.disabled')
    cy.get(_.input).should('have.attr', 'placeholder', 'Search to start')
    cy.get('.rpl-form-autocomplete__icon').should('exist')
  })

  it('fetches and displays suggestions when typing', () => {
    mount()

    cy.get(_.input).type('a')

    cy.get(_.menu).should('be.visible')
    cy.get(_.option).should('have.length', 4)
    cy.get(_.option).eq(0).should('contain', 'Apple')
    cy.get(_.option).eq(1).should('contain', 'Banana')

    cy.get(_.input).type('t')

    cy.get(_.menu).should('be.visible')
    cy.get(_.option).should('have.length', 1)
    cy.get(_.option).eq(0).should('contain', 'Date')
  })

  it('shows no results message when no matches found', () => {
    mount({ showNoResults: true })

    cy.get(_.input).type('xyz')
    cy.get(_.noResults).should('be.visible').should('contain', 'No results')

    cy.get(_.input).clear()
    cy.get(_.noResults).should('not.exist')
  })

  it('allows selecting an option on click', () => {
    const onSelectOption = cy.stub().as('onSelectOption')
    const onChange = cy.stub().as('onChange')

    mount({ onSelectOption, onChange })

    cy.get(_.input).type('a')
    cy.get(_.option).contains('Apple').click()

    cy.get(_.menu).should('not.exist')
    cy.get(_.input).contains('Apple')

    cy.then(() => {
      expect(onSelectOption).to.have.been.calledWith({
        id: 'apple',
        label: 'Apple'
      })
    })
  })

  it('allows for navigation and option selection via keyboard', () => {
    const onSelectOption = cy.stub().as('onSelectOption')

    mount({ onSelectOption })

    cy.get(_.input).type('a')

    cy.get('body').type('{downarrow}')
    cy.get(_.option).eq(0).should('have.class', 'rpl-u-focusable--force-on')

    cy.get('body').type('{downarrow}')
    cy.get(_.option).eq(1).should('have.class', 'rpl-u-focusable--force-on')

    cy.get('body').type('{uparrow}')
    cy.get(_.option).eq(0).should('have.class', 'rpl-u-focusable--force-on')

    cy.get('body').type('{enter}')

    cy.get(_.menu).should('not.exist')
    cy.get(_.input).contains('Apple')

    cy.then(() => {
      expect(onSelectOption).to.have.been.calledWith({
        id: 'apple',
        label: 'Apple'
      })
    })
  })

  it('can close the menu via the escape key', () => {
    mount()

    cy.get(_.input).type('a')
    cy.get(_.menu).should('be.visible')

    cy.get('body').type('{esc}')
    cy.get(_.menu).should('not.exist')
  })

  it('clears the input when clear button is clicked', () => {
    const onChange = cy.stub().as('onChange')

    mount({ onChange })

    cy.get(_.input).type('apple')
    cy.get(_.option).contains('Apple').click()
    cy.get(_.input).contains('Apple')

    cy.get(_.clear).click()

    cy.get(_.input).should('have.value', '')
    cy.get(_.clear).should('not.exist')

    cy.then(() => {
      expect(onChange).to.have.been.calledWith(null)
    })
  })

  it('emits onChange for every keystroke in free text mode', () => {
    const onChange = cy.stub().as('onChange')
    mount({ isFreeText: true, onChange })

    cy.get(_.input).type('abc')
    cy.get(_.clear).should('not.exist')

    cy.then(() => {
      expect(onChange).to.have.been.calledWith('a')
      expect(onChange).to.have.been.calledWith('ab')
      expect(onChange).to.have.been.calledWith('abc')
    })
  })

  it('can include an action button that emits the action event when clicked', () => {
    const onActionClick = cy.stub().as('onActionClick')
    mount({
      showAction: true,
      actionLabel: 'Add new fruit',
      onActionClick
    })

    cy.get('button').contains('Add new fruit').click()

    cy.then(() => {
      expect(onActionClick).to.have.been.called
    })
  })

  it('can render with custom suggestion labels and values', () => {
    const onChange = cy.stub().as('onChange')
    const getSuggestions = () => {
      return Promise.resolve([
        { code: 'au', name: 'Australia' },
        { code: 'at', name: 'Austria' }
      ])
    }

    mount({
      onChange,
      getSuggestions,
      getOptionId: (item: any) => item.code,
      renderSuggestionLabel: (item: any) => `Country: ${item.name}`,
      renderValueLabel: (item: any) => `Country - ${item.name}`
    })

    cy.get(_.input).type('au')
    cy.get(_.option).contains('Country: Australia').click()
    cy.get(_.input).contains('Country - Australia')

    cy.then(() => {
      expect(onChange).to.have.been.calledWith({
        code: 'au',
        name: 'Australia'
      })
    })
  })

  it('can render with a custom no results slot', () => {
    cy.mountComponent(RplFormAutocomplete, {
      props: {
        ...baseProps,
        getSuggestions: () => Promise.resolve([]),
        showNoResults: true
      },
      slots: {
        noresults: () =>
          h('div', { class: 'custom-no-results' }, 'Nothing to see here')
      }
    })

    cy.get(_.input).type('xyz')
    cy.get('.custom-no-results').should('contain', 'Nothing to see here')
  })

  it('can render with a custom suggestion slot', () => {
    cy.mountComponent(RplFormAutocomplete, {
      props: {
        ...baseProps,
        getSuggestions: () => Promise.resolve([{ id: '1', label: 'One' }])
      },
      slots: {
        suggestion: (props: any) => `My custom ${props.option.option.label}`
      }
    })

    cy.get(_.input).type('o')
    cy.get(_.option).should('contain', 'My custom One')
  })
})
