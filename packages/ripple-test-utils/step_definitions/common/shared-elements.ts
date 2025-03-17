import {
  Then,
  DataTable,
  When,
  Given
} from '@badeball/cypress-cucumber-preprocessor'
import { set } from 'lodash-es'

Then('the page title should be {string}', (title: string) => {
  cy.title().should('equal', title)
})

Then('the title should be {string}', (title: string) => {
  cy.get('[data-cy="hero-title"]').should('have.text', title)
})

Then(
  'the breadcrumbs should have the following items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="breadcrumbs"]`).as('component')

    cy.get('@component').within(() => {
      cy.get(
        `.rpl-breadcrumbs__item:not(.rpl-breadcrumbs__item--collapsed)`
      ).as('items')
    })

    cy.get('@items').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)

          // Last item is just text
          if (row.url) {
            cy.get('@item').find('a').should('have.attr', 'href', row.url)
          }
        })
    })
  }
)

Then('the breadcrumbs should not exist', () => {
  cy.get(`[data-cy="breadcrumbs"]`).should('not.exist')
})

Then('I expand the breadcrumbs', () => {
  cy.get(`.rpl-breadcrumbs__collapse-link-trigger`).click()
})

Then(
  'the last updated date text should read {string}',
  (updatedDateText: string) => {
    cy.get(`[data-cy="updated-date"]`).should('contain', updatedDateText)
  }
)

Then('the last updated date should not be displayed', () => {
  cy.get(`[data-cy="updated-date"]`).should('not.exist')
})

Then('the primary nav links should wrap', () => {
  cy.get('.rpl-primary-nav__nav-bar-actions-list--nowrap').should('not.exist')
})

Then('the primary nav links should not wrap', () => {
  cy.get('.rpl-primary-nav__nav-bar-actions-list').should(
    'have.class',
    'rpl-primary-nav__nav-bar-actions-list--nowrap'
  )
})

Then(
  'the page should have the following topic tags',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`[data-cy="topic-tags"]`).within(() => {
      cy.get(`a`).as('tags')
    })

    cy.get('@tags').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@tags')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').should('have.attr', 'href', row.url)
        })
    })
  }
)

Then(
  'the footer nav section with title {string} should have the following links',
  (sectionTitle: string, dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-footer-nav-section`)
      .contains('h3', sectionTitle)
      .as('sectionTitle')

    cy.get('@sectionTitle')
      .closest('.rpl-footer-nav-section')
      .within(() => {
        cy.get(`.rpl-list__item`).as('items')
      })

    cy.get('@items').should('have.length', table.length)

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
        })
    })
  }
)

Then(
  'the footer nav section with title {string} should link to {string}',
  (title: string, link: string) => {
    cy.get('.rpl-footer-nav-section__title a')
      .contains(title)
      .should('have.attr', 'href', link)
  }
)

When(
  'I open the footer nav section with title {string}',
  (sectionTitle: string) => {
    cy.get('.rpl-footer-nav-section button')
      .contains('h3', sectionTitle)
      .click()
  }
)

Then(
  'the footer nav should have the following single level items',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(`.rpl-footer-nav-section__title`).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((item) => {
          cy.wrap(item).as('item')
          cy.get('@item').should('contain', row.text)
          cy.get('@item').find('a').should('have.attr', 'href', row.url)
          cy.get('@item')
            .parents('.rpl-footer-nav-section')
            .find('.rpl-list__items')
            .should('not.exist')
        })
    })
  }
)

Then('the footer should have the following links', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get(`.rpl-footer-core-links`).as('component')

  cy.get('@component').within(() => {
    cy.get(`li`).as('items')
  })

  cy.get('@items').should('have.length', table.length)

  table.forEach((row, i: number) => {
    cy.get('@items')
      .eq(i)
      .then((item) => {
        cy.wrap(item).as('item')
        cy.get('@item').should('contain', row.text)
        cy.get('@item').find('a').should('have.attr', 'href', row.url)
      })
  })
})

Then(
  'the footer copyright text should be {string}',
  (copyrightText: string) => {
    cy.get(`[data-cy="footer-copyright"]`).should('contain', copyrightText)
  }
)

Then(
  'the footer acknowledgement text should be {string}',
  (copyrightText: string) => {
    cy.get(`[data-component-type="site-footer"]`).as('footer')

    cy.get('@footer').within(() => {
      cy.get(`.rpl-acknowledgement`).should('contain', copyrightText)
    })
  }
)

Then('the footer should have the following logos', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get(`.rpl-footer-bottom__branding`).as('component')

  cy.get('@component').within(() => {
    cy.get(`a`).as('logos')
  })

  table.forEach((row, i: number) => {
    cy.get('@logos')
      .eq(i)
      .then((logo) => {
        cy.wrap(logo).as('logo')
        cy.get('@logo').should('have.attr', 'href', row.url)
        cy.get('@logo').find('img').should('have.attr', 'src', row.src)
        cy.get('@logo').find('img').should('have.attr', 'alt', row.alt)
      })
  })
})

Given(
  'the feature flag {string} is set to {string}',
  (flag: string, value: string) => {
    if (value === 'true') value = true
    if (value === 'false') value = false
    cy.get('@siteFixture').then((response) => {
      set(response, `featureFlags.${flag}`, value)
    })
  }
)

Given('the site wide quick exit is enabled', () => {
  cy.get('@siteFixture').then((response) => {
    set(response, 'showQuickExit', true)
  })
})

Given('the site section quick exit is enabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'siteSection.siteOverrides.showQuickExit', true)
  })
})

Given('the site section quick exit is disabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'siteSection.siteOverrides.showQuickExit', false)
  })
})

Given('the site section quick exit is inherited', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'siteSection.siteOverrides.showQuickExit', null)
  })
})

Then('the quick exit should be displayed', () => {
  cy.get('.rpl-primary-nav__quick-exit').should('be.visible')
})

Then('the quick exit should not be displayed', () => {
  cy.get('.rpl-primary-nav__quick-exit').should('not.exist')
})

Then('the content rating form should be displayed', () => {
  cy.get('.tide-content-rating').should('be.visible')
})

Then('the content rating form should not be displayed', () => {
  cy.get('.tide-content-rating').should('not.exist')
})

Then(
  'the content rating form should display the custom text {string}',
  (text: string) => {
    cy.get('.tide-content-rating__text').should('have.text', text)
  }
)

Then('I click the content rating option labelled {string}', (label: string) => {
  cy.get('.tide-content-rating label').contains(label).click()
})

Given('the content rating form is enabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'showContentRating', true)
  })
})

Given('the content rating form is disabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'showContentRating', false)
  })
})

Given('the social share links are enabled', () => {
  cy.get('@pageFixture').then((response) => {
    set(response, 'sidebar.socialShareNetworks', ['Facebook', 'X', 'LinkedIn'])
  })
})

Given('the site sections share links are set to included WhatsApp', () => {
  cy.get('@pageFixture').then((response) => {
    set(
      response,
      'siteSection.siteOverrides.featureFlags[socialShare.WhatsApp]',
      true
    )
  })
})

Then('the in page navigation should include', (dataTable: DataTable) => {
  const table = dataTable.hashes()

  cy.get('.rpl-in-page-navigation li').as('links')

  table.forEach((row, i: number) => {
    cy.get('@links')
      .eq(i)
      .then((link) => {
        cy.wrap(link).as('link')
        cy.get('@link').find('a').first().should('have.attr', 'href', row.url)
        cy.get('@link').find('.rpl-list__label').first().contains(row.title)
      })
  })
})

Given('I click on the document {string}', (label: string) => {
  cy.contains('.rpl-document__link', label).trigger('click')
})

Then(
  'the site section nav should contain the following level 1 items:',
  (dataTable: DataTable) => {
    const table = dataTable.hashes()

    cy.get(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"] .rpl-vertical-nav__list--level-1 > li'
    ).as('items')

    table.forEach((row, i: number) => {
      cy.get('@items')
        .eq(i)
        .then((link) => {
          cy.wrap(link).as('link')
          cy.get('@link').find('a').first().should('have.attr', 'href', row.url)
          cy.get('@link').find('a').first().contains(row.text)
        })
    })
  }
)

Then(
  'the site section nav item with label {string} should be collapsed',
  (label: string) => {
    cy.contains(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"] .rpl-vertical-nav__list--level-1 > li',
      label
    ).as('item')
    cy.get('@item').should(
      'not.have.class',
      'rpl-vertical-nav__list-item--expanded'
    )
  }
)

Then(
  'the site section nav item with label {string} should be expanded',
  (label: string) => {
    cy.contains(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"] .rpl-vertical-nav__list--level-1 > li',
      label
    ).as('item')
    cy.get('@item').should(
      'have.class',
      'rpl-vertical-nav__list-item--expanded'
    )
  }
)

Then(
  'the site section nav item with label {string} should be active',
  (label: string) => {
    cy.get(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"] .rpl-vertical-nav__item--active'
    ).as('item')
    cy.get('@item').should('have.length', 1)
    cy.get('@item').should('contain', label)
  }
)

Then(
  'the site section nav item with label {string} should be inactive',
  (label: string) => {
    cy.get(
      '[data-sidebar-component-id="tide-sidebar-site-section-nav"] .rpl-vertical-nav__item--active'
    ).as('item')
    cy.get('@item').should('not.contain', label)
  }
)
