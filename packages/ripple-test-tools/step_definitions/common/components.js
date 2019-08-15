/* global cy */
/* eslint jest/valid-expect: "off" */

const { Then } = require('cypress-cucumber-preprocessor/steps')

// Layout common elements

// Breadcrumbs
Then(`the breadcrumbs should exist`, () => {
  cy.get('.rpl-breadcrumbs').should('be.visible')
})
Then(`the breadcrumbs should not exist`, () => {
  cy.get('.rpl-breadcrumbs').should('not.exist')
})

Then(`there should be {int} breadcrumb items`, length => {
  cy.get('.rpl-breadcrumbs__items').children().should('have.length', length)
})

// Anchor Links
Then(`the anchor links component should exist`, () => {
  cy.get('.rpl-anchor-links').should('exist')
})

Then(`the anchor link title should be {string}`, title => {
  cy.get('.rpl-anchor-links__title').should('contain', title)
})

Then(`there should be {int} anchor links`, length => {
  cy.get('.rpl-anchor-links__items').children().should('have.length', length)
  cy.log('test')
})

// Content rating
Then(`the content rating component should exist`, () => {
  cy.get('.app-content-rating').should('exist')
})
// Header
Then(`the page header should exist`, () => {
  cy.get('.rpl-site-header').should('exist')
})
// Footer
Then(`the page header should exist`, () => {
  cy.get('.rpl-site-footer').should('exist')
})

// Above content elements

// Hero banner
Then(`the hero banner component should exist`, () => {
  cy.get('.rpl-hero-banner').should('exist')
})

Then(`the hero banner title should be {string}`, (title) => {
  cy.get('.rpl-hero-banner__title').should('contain', title)
})

Then(`the hero banner desciption should be {string}`, (text) => {
  cy.get('.rpl-hero-banner__description').should('contain', text)
})

// Intro Banner
Then(`the intro banner component should exist`, () => {
  cy.get('.rpl-intro-banner').should('exist')
})
// Intro Banner

// Campaign primary
Then(`the campaign primary banner component should exist`, () => {
  cy.get('.rpl-campaign-primary').should('exist')
})

Then(`the campaign primary title should be {string}`, title => {
  cy.get('.rpl-campaign-primary__title').should('contain', title)
})

// Body markup
Then(`the body markup component should exist`, () => {
  cy.get('.rpl-markup').should('exist')
})
Then(`the order number {int} wysiwyg content matches fixture {string}`, (order, fixture) => {
  cy.fixture(fixture).then((bodyMarkup) => {
    cy.get('.rpl-markup').eq(order - 1).then(rplMarkup => {
      expect(rplMarkup).to.have.html(bodyMarkup) //eslint-disable-line
    })
  })
})

// featured news list
Then(`the featured news list component should exist`, () => {
  cy.get('.rpl-featured-news-list').should('exist')
})
// featured card navigation
Then(`the featured card navigation component should exist`, () => {
  cy.get('.rpl-card-navigation-featured').should('exist')
})
// card event
Then(`the card event component should exist`, () => {
  cy.get('.rpl-card-event').should('exist')
})
// card event
Then(`the card event component should exist`, () => {
  cy.get('.rpl-card-event').should('exist')
})
// card CTA
Then(`the card CTA component should exist`, () => {
  cy.get('.rpl-card-cta, .rpl-call-to-action').should('exist')
})
// card keydates
Then(`the card keydates component should exist`, () => {
  cy.get('.rpl-card-keydates').should('exist')
})
// card promotion
Then(`the card promotion component should exist`, () => {
  cy.get('.rpl-card-promotion').should('exist')
})
// card carousel
Then(`the card carousel component should exist`, () => {
  cy.get('.rpl-card-carousel').should('exist')
})
// accordion
Then(`the accordion component should exist`, () => {
  cy.get('.rpl-accordion').should('exist')
})
// news listing'
Then(`the news listing component should exist`, () => {
  cy.get('.rpl-news-listing').should('exist')
})
// timeline
Then(`the timeline component should exist`, () => {
  cy.get('.rpl-timeline').should('exist')
})
// image gallery
Then(`the image gallery component should exist`, () => {
  cy.get('.rpl-image-gallery').should('exist')
})

// Sidebar components

// Related links
Then(`the related links component should exist`, () => {
  cy.get('.rpl-related-links').should('exist')
})

Then(`the related links title should be {string}`, (title) => {
  cy.get('.rpl-related-links__title').should('contain', title)
})

Then(`the related links should contain the following links:`, (dataTable) => {
  const links = dataTable.rawTable.slice(1)
  links.forEach((link, index) => {
    cy.get('.rpl-related-links__item a').eq(index).then(relatedLink => {
      const title = link[0].trim()
      const url = link[1]
      const target = link[2]
      expect(relatedLink).to.contain.text(title)
      expect(relatedLink).to.contain.attr('href', url)
      if (target === 'external') {
        // this should change after SDPA-2983 is merged
        expect(relatedLink).to.contain.attr('target', '_blank')
        cy.wrap(relatedLink).get('.rpl-icon--external_link').should('exist')
      }
    })
  })
})

// contact
Then(`the contact component should exist`, () => {
  cy.get('.rpl-contact').should('exist')
})
// whats next
Then(`the whats next component should exist`, () => {
  cy.get('.rpl-whats-next').should('exist')
})
Then(`the whats next title should be {string}`, (title) => {
  cy.get('.rpl-whats-next .rpl-whats-next__title').should('contain', title)
})

Then(`the whats next links should be:`, (dataTable) => {
  const links = dataTable.rawTable.slice(1)
  links.forEach((link, index) => {
    cy.get('.rpl-whats-next__item a').eq(index).then(relatedLink => {
      const title = link[0].trim()
      const url = link[1]
      const target = link[2]
      expect(relatedLink).to.contain.text(title)
      expect(relatedLink).to.contain.attr('href', url)
      if (target === 'external') {
        // this should change after SDPA-2983 is merged
        expect(relatedLink).to.contain.attr('target', '_blank')
        cy.wrap(relatedLink).get('.rpl-icon--external_link').should('exist')
      }
    })
  })
})

// share this
Then(`the share this component should exist`, () => {
  cy.get('.rpl-share-this').should('exist')
})
Then(`the share this component should have the title "Share this"`, () => {
  cy.get('.rpl-share-this__title').should('contain', 'Share this')
})
Then(`the share this component should have the following social links:`, (dataTable) => {
  const networks = dataTable.rawTable.slice(1)
  networks.forEach((network, index) => {
    cy.get('.rpl-share-this__social').eq(index).then(shareLink => {
      const title = network[0]
      expect(shareLink).to.contain.text(title)
      cy.wrap(shareLink).get('.rpl-icon').should('exist')
      cy.wrap(shareLink).get('.rpl-icon').should('have.class', `rpl-icon--${title.replace(' ', '').toLowerCase()}`)
    })
  })
})

Then(`the share this links should read "open in a new window" to screen readers`, () => {
  cy.get('.rpl-share-this__hint').each(link => {
    expect(link).to.contain.text('opens a new window')
  })
})
