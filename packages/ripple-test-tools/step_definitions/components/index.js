/* global cy */
/* eslint jest/valid-expect: "off" */

const { When, Then, Given } = require('cypress-cucumber-preprocessor/steps')

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

Then(`there should be the following anchor links:`, dataTable => {
  const expectedLinks = dataTable.hashes()
  const expectedHrefs = expectedLinks.map(l => l.link)
  const expectedText = expectedLinks.map(l => l.text)
  cy.get('.rpl-anchor-links__item > a').each(($el, index) => {
    const text = $el.text()
    const href = $el.attr('href').split('#')[1]
    cy.wrap(expectedText).should('contain', text)
    cy.wrap(expectedHrefs).should('contain', href)
  })
})

// Content rating
Then(`the content rating component should exist`, () => {
  cy.get('.tide-content-rating').should('exist')
})
Then(`the content rating component legend should be {string}`, (legend) => {
  cy.get('.tide-content-rating legend').should('contain', legend)
})
When(`I click the {string} radio button in the content rating component`, (input) => {
  cy.get(`.tide-content-rating input[value="${input}"]`).click()
})
Then(`the content rating component summary textfield should display`, () => {
  cy.get(`.tide-content-rating .form-group.field-textArea`).should('be.visible')
})
Then(`the the content rating component "Cancel" button should be visible`, () => {
  cy.get(`.tide-content-rating .app-button--cancel`).should('be.visible')
})
Then(`the the content rating component "Submit" button should be visible`, () => {
  cy.get(`.tide-content-rating input[type="submit"]`).should('be.visible')
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

Then(`the campaign primary banner should contain:`, (dataTable) => {
  const primaryCampaign = dataTable.rawTable.slice(1)
  primaryCampaign.forEach((link, index) => {
    cy.get('.rpl-campaign-primary').eq(index).then(campaign => {
      const title = link[0].trim()
      const body = link[1]
      const ctatext = link[2]
      const ctalink = link[3]
      expect(campaign).to.contain.text(title)
      expect(campaign).to.contain.text(body)
      cy.wrap(campaign).get('.rpl-campaign-primary__call-to-action').then(ctalinkobj => {
        expect(ctalinkobj).to.contain.text(ctatext)
        expect(ctalinkobj).to.contain.attr('href', ctalink)
      })
    })
  })
})

// Campaign secondary
Then(`the campaign secondary component should exist`, () => {
  cy.get('.rpl-campaign-secondary').should('exist')
})

Then(`the campaign secondary component should contain:`, (dataTable) => {
  const primarySecondary = dataTable.rawTable.slice(1)
  primarySecondary.forEach((link, index) => {
    cy.get('.rpl-campaign-secondary').eq(index).then(campaign => {
      const title = link[0].trim()
      const body = link[1]
      const ctatext = link[2]
      const ctalink = link[3]
      expect(campaign).to.contain.text(title)
      expect(campaign).to.contain.text(body)
      cy.wrap(campaign).get('.rpl-campaign-secondary a').then(ctalinkobj => {
        expect(ctalinkobj).to.contain.text(ctatext)
        expect(ctalinkobj).to.contain.attr('href', ctalink)
      })
    })
  })
})

// Body markup
Then(`the body markup component should exist`, () => {
  cy.get('.rpl-markup').should('exist')
})
Then(`the order number {int} wysiwyg content contains fixture {string}`, (order, fixture) => {
  cy.fixture(fixture).then((bodyMarkup) => {
    cy.get(`.rpl-markup:nth-child(${order})`).invoke('html').should('include', bodyMarkup)
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
Then(`there should be a navigation featured card with the title {string}`, (title) => {
  cy.get('.rpl-card-navigation-featured .rpl-card-navigation-featured__title').should('contain', title)
})
Then(`the navigation card featured titled {string} should contain the following:`, (title, dataTable) => {
  const navigationFeaturedCard = dataTable.rawTable.slice(1)
  // Find the navigation card featured.
  cy.get('.rpl-card-navigation-featured').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-navigation-featured__title').then(cardTitle => {
        if (cardTitle[0].textContent === title) {
          // For each data-row, check against navigation card featured.
          navigationFeaturedCard.forEach((navigationRow, index) => {
            const title = navigationRow[0]
            const image = navigationRow[1]
            const summary = navigationRow[2]
            const link = navigationRow[3]
            expect(card).to.contain.text(title)
            expect(card).to.contain.text(summary)
            expect(card).to.contain.attr('href', link)
            cy.wrap(card).find('.rpl-card-navigation-featured__image').invoke('attr', 'src').should('contain', image)
          })
        }
      })
    })
  })
})
Then(`there should be a navigation featured automated card with the title {string}`, (title) => {
  cy.get('.rpl-card-navigation-featured .rpl-card-navigation-featured__title').should('contain', title)
})
Then(`the navigation featured automated card titled {string} should contain the following:`, (title, dataTable) => {
  const navigationFeaturedCard = dataTable.rawTable.slice(1)
  // Find the navigation card featured.
  cy.get('.rpl-card-navigation-featured').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-navigation-featured__title').then(cardTitle => {
        if (cardTitle[0].textContent === title) {
          // For each data-row, check against navigation card featured.
          navigationFeaturedCard.forEach((navigationRow, index) => {
            const title = navigationRow[0]
            const image = navigationRow[1]
            const link = navigationRow[2]
            expect(card).to.contain.text(title)
            expect(card).to.contain.attr('href', link)
            cy.wrap(card).find('.rpl-card-navigation-featured__image').invoke('attr', 'src').should('contain', image)
          })
        }
      })
    })
  })
})
// card event
Then(`the card event component should exist`, () => {
  cy.get('.rpl-card-event').should('exist')
})
Then(`there should be an event card with the title {string}`, (title) => {
  cy.get('.rpl-card-event .rpl-card-event__title').should('contain', title)
})
Then(`the event card titled {string} should contain the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-card-event:not([data-tid])').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-event__title').then(cardTitle => {
        if (cardTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.date !== undefined) {
              expect(card).to.contain.text(row[column.date])
            }
            if (column.title !== undefined) {
              expect(card).to.contain.text(row[column.title])
            }
            if (column.summary !== undefined) {
              expect(card).to.contain.text(row[column.summary])
            }
            if (column.location !== undefined) {
              expect(card).to.contain.text(row[column.location])
            }
            if (column.link !== undefined) {
              expect(card).to.contain.attr('href', row[column.link])
            }
            if (column.linktext !== undefined) {
              expect(card).to.contain.text(row[column.linktext])
            }
          })
        }
      })
    })
  })
})
// card keydates
Then(`the card keydates component should exist`, () => {
  cy.get('.rpl-card-keydates').should('exist')
})
Then(`there should be a keydates card with the title {string}`, (title) => {
  cy.get('.rpl-card-keydates .rpl-card-keydates__title').should('contain', title)
})
Then(`the keydates card titled {string} should contain the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-card-keydates').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-keydates__title').then(cardTitle => {
        if (cardTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.title !== undefined) {
              expect(card).to.contain.text(row[column.title])
            }
            if (column.ctalink !== undefined) {
              expect(card).to.contain.attr('href', row[column.ctalink])
            }
            if (column.ctatext !== undefined) {
              expect(card).to.contain.text(row[column.ctatext])
            }
          })
        }
      })
    })
  })
})
Then(`the keydates card titled {string} should have the following items:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-card-keydates').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-keydates__title').then(cardTitle => {
        if (cardTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.date !== undefined) {
              expect(card).to.contain.text(row[column.date])
            }
            if (column.title !== undefined) {
              expect(card).to.contain.text(row[column.title])
            }
            if (column.description !== undefined) {
              expect(card).to.contain.text(row[column.description])
            }
          })
        }
      })
    })
  })
})
// card promotion
Then(`the card promotion component should exist`, () => {
  cy.get('.rpl-card-promotion').should('exist')
})
Then(`there should be a promotion card with the title {string}`, (title) => {
  cy.get('.rpl-card-promotion .rpl-card-promotion__title').should('contain', title)
})
Then(`the promotion card titled {string} should contain the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-card-promotion').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-promotion__title').then(cardTitle => {
        if (cardTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.date !== undefined) {
              expect(card).to.contain.text(row[column.date])
            }
            if (column.title !== undefined) {
              expect(card).to.contain.text(row[column.title])
            }
            if (column.summary !== undefined) {
              expect(card).to.contain.text(row[column.summary])
            }
            if (column.ctalink !== undefined) {
              expect(card).to.contain.attr('href', row[column.ctalink])
            }
            if (column.ctatext !== undefined) {
              expect(card).to.contain.text(row[column.ctatext])
            }
            if (column.topic !== undefined) {
              expect(card).to.contain.text(row[column.topic])
            }
          })
        }
      })
    })
  })
})
// card navigation
Then(`there should be a navigation card with the title {string}`, (title) => {
  cy.get('.rpl-card-navigation .rpl-card-navigation__title').should('contain', title)
})
Then(`the navigation card titled {string} should contain the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-card-navigation').then(cards => {
    cards.each((index, card) => {
      cy.wrap(card).find('.rpl-card-navigation__title').then(cardTitle => {
        if (cardTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.title !== undefined) {
              expect(card).to.contain.text(row[column.title])
            }
            if (column.summary !== undefined) {
              expect(card).to.contain.text(row[column.summary])
            }
            if (column.ctatext !== undefined) {
              expect(card).to.contain.text(row[column.ctatext])
            }
            if (column.ctalink !== undefined) {
              expect(card).to.contain.attr('href', row[column.ctalink])
            }
          })
        }
      })
    })
  })
})
// card promo
Then(`the card promo component should exist`, () => {
  cy.get('.rpl-card-promo').should('exist')
})
// card nav
Then(`the card nav component should exist`, () => {
  cy.get('.rpl-card-nav').should('exist')
})
// card carousel
Then(`the card carousel component should exist`, () => {
  cy.get('.rpl-card-carousel').should('exist')
})
Then(`there should be a card carousel titled {string}`, (title) => {
  cy.get('.rpl-card-carousel .rpl-card-carousel__title').should('contain', title)
})
Then(`the card carousel titled {string} should have {int} items`, (title, length) => {
  cy.get('.rpl-card-carousel').then(carousels => {
    carousels.each((index, carousel) => {
      cy.wrap(carousel).find('.rpl-card-carousel__title').then(carouselTitle => {
        if (carouselTitle[0].innerHTML === title) {
          cy.wrap(carousel).find('.rpl-card-carousel__slide').should('have.length', length)
        }
      })
    })
  })
})
Then(`the card carousel titled {string} should have the following items:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  // Find the correct carousel.
  cy.get('.rpl-card-carousel').then(carousels => {
    carousels.each((index, carousel) => {
      cy.wrap(carousel).find('.rpl-card-carousel__title').then(carouselTitle => {
        if (carouselTitle[0].innerHTML === title) {
          // For each data-row, check against carousel slide.
          table.forEach((row, index) => {
            cy.wrap(carousel).find('.rpl-card-carousel__slide').eq(index).then(slide => {
              if (column.date !== undefined) {
                expect(slide).to.contain.text(row[column.date])
              }
              if (column.title !== undefined) {
                expect(slide).to.contain.text(row[column.title])
              }
              if (column.summary !== undefined) {
                expect(slide).to.contain.text(row[column.summary])
              }
              if (column.address !== undefined) {
                expect(slide).to.contain.text(row[column.address])
              }
              if (column.linktext !== undefined) {
                expect(slide).to.contain.text(row[column.linktext])
              }
              if (column.image !== undefined) {
                cy.wrap(slide).find('.rpl-card-content__image').invoke('attr', 'src').should('contain', row[column.image])
              }
              if (column.link !== undefined) {
                cy.wrap(slide).find('.rpl-link').should('have.attr', 'href', row[column.link])
              }
            })
          })
        }
      })
    })
  })
})
// accordion
Then(`the accordion component should exist`, () => {
  cy.get('.rpl-accordion').should('exist')
})
Then(`there should be {int} accordion components`, length => {
  cy.get('.rpl-accordion').should('have.length', length)
})
Then(`the number {int} accordion title should be {string}`, (index, title) => {
  cy.get('.rpl-accordion').eq(index - 1).find('.rpl-accordion__title-top').should('contain', title)
})
Then(`the accordion titled {string} should contain the following items:`, (title, dataTable) => {
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-accordion').then(accordions => {
    accordions.each((index, accordion) => {
      cy.wrap(accordion).find('.rpl-accordion__title-top').then(accordionTitle => {
        if (accordionTitle[0].innerHTML === title) {
          table.forEach(row => {
            const title = row[0]
            const body = row[1]
            cy.wrap(accordion).find('.rpl-accordion__button').should('contain', title)
            cy.wrap(accordion).find('.rpl-accordion__content').should('contain', body)
          })
        }
      })
    })
  })
})
// news listing
Then(`the news listing component should exist`, () => {
  cy.get('.rpl-news-listing').should('exist')
})

Then('there should be the following news listing components:', (dataTable) => {
  dataTable.hashes().forEach((expected, idx) => {
    cy.get('.rpl-news-listing .rpl-news-listing__item').eq(idx).as('item')
    cy.get('@item').should('be.visible')
    if (expected.date) {
      cy.get('@item')
        .find('.rpl-news-listing__item-date')
        .invoke('text')
        .should('equal', expected.date)
    }
    if (expected.tag) {
      cy.get('@item')
        .find('.rpl-news-listing__item-tag')
        .invoke('text')
        .should('equal', expected.tag)
    }
    if (expected.title) {
      cy.get('@item')
        .find('.rpl-news-listing__item-heading')
        .invoke('text')
        .should('equal', expected.title)
    }
    if (expected.link) {
      cy.get('@item')
        .find('.rpl-news-listing__item-heading a')
        .invoke('attr', 'href')
        .should('contain', expected.link)
    }
  })
})

// featured news listing
Then(`the featured news listing component should have the following items:`, (dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-featured-news-list .rpl-featured-news-list__item').then(newsItems => {
    table.forEach((row, index) => {
      if (column.date !== undefined) {
        expect(newsItems[index]).to.contain.text(row[column.date])
      }
      if (column.tag !== undefined) {
        expect(newsItems[index]).to.contain.text(row[column.tag])
      }
      if (column.title !== undefined) {
        expect(newsItems[index]).to.contain.text(row[column.title])
      }
      if (column.link !== undefined) {
        cy.wrap(newsItems[index]).find('a').should('have.attr', 'href', row[column.link])
      }
    })
  })
})
// timeline
Then(`the timeline component should exist`, () => {
  cy.get('.rpl-timeline').should('exist')
})
Then(`the timeline component titled {string} should exist`, (title) => {
  cy.get('.rpl-timeline .rpl-timeline__title').should('contain', title)
})
Then(`the timeline component titled {string} should have the following items:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-timeline').then(timeline => {
    cy.wrap(timeline).find('.rpl-timeline__title').then(timelineTitle => {
      if (timelineTitle[0].innerHTML === title) {
        // For each data-row, check against timeline slide.
        table.forEach((row, index) => {
          cy.wrap(timeline).find('.rpl-timeline__list-item').eq(index).then(timelineItem => {
            if (column.date !== undefined) {
              expect(timelineItem).to.contain.text(row[column.date])
            }
            if (column.title !== undefined) {
              expect(timelineItem).to.contain.text(row[column.title])
            }
            if (column.summary !== undefined) {
              expect(timelineItem).to.contain.text(row[column.summary])
            }
            if (column.image !== undefined) {
              cy.wrap(timelineItem).find('.rpl-timeline__item-image').invoke('attr', 'src').should('contain', row[column.image])
            }
            if (column.link !== undefined) {
              cy.wrap(timelineItem).find('.rpl-link').should('have.attr', 'href', row[column.link])
            }
          })
        })
      }
    })
  })
})
// Key Journeys
Then(`the key journey component should exist`, () => {
  cy.get('.rpl-intro-banner__link-list').should('exist')
})
Then(`the key journey component should have the following items:`, (dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-intro-banner__link-list .rpl-intro-banner__link-list-item').then(listItem => {
    table.forEach(row => {
      if (column.linktext !== undefined) {
        expect(listItem).to.contain.text(row[column.linktext])
      }
      if (column.link !== undefined) {
        cy.wrap(listItem).find('.rpl-link').should('have.attr', 'href', row[column.link])
      }
    })
  })
})
// image gallery
Then(`the image gallery component should exist`, () => {
  cy.get('.rpl-image-gallery').should('exist')
})
Then(`the image gallery component should have the following items:`, (dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-image-gallery .rpl-image-gallery__thumbnail').then(galleryItem => {
    table.forEach((row, index) => {
      if (column.image !== undefined) {
        cy.wrap(galleryItem[index]).find('.rpl-image-gallery__thumbnail-image').invoke('attr', 'src').should('contain', row[column.image])
      }
      if (column.title !== undefined) {
        expect(galleryItem[index]).to.contain.text(row[column.title])
      }
      if (column.caption !== undefined) {
        expect(galleryItem[index]).to.contain.text(row[column.caption])
      }
    })
  })
})
// latest events
Then(`there should be a latest events titled {string}`, (title) => {
  cy.get('.rpl-latest-events .rpl-latest-events__title').should('contain', title)
})
Then(`the latest events titled {string} should have {int} items`, (title, length) => {
  cy.get('.rpl-latest-events').then(carousels => {
    carousels.each((index, carousel) => {
      cy.wrap(carousel).find('.rpl-latest-events__title').then(carouselTitle => {
        if (carouselTitle[0].innerHTML === title) {
          cy.wrap(carousel).find('.rpl-latest-events__card').should('have.length', length)
        }
      })
    })
  })
})
Then(`the latest events titled {string} should have the following items:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  // Find the correct carousel.
  cy.get('.rpl-latest-events').then(carousels => {
    carousels.each((index, carousel) => {
      cy.wrap(carousel).find('.rpl-latest-events__title').then(carouselTitle => {
        if (carouselTitle[0].innerHTML === title) {
          // For each data-row, check against featured events cards.
          table.forEach((row, index) => {
            cy.wrap(carousel).find('.rpl-latest-events__card').eq(index).then(card => {
              if (column.date !== undefined) {
                expect(card).to.contain.text(row[column.date])
              }
              if (column.title !== undefined) {
                expect(card).to.contain.text(row[column.title])
              }
              if (column.summary !== undefined) {
                expect(card).to.contain.text(row[column.summary])
              }
              if (column.address !== undefined) {
                expect(card).to.contain.text(row[column.address])
              }
              if (column.linktext !== undefined) {
                expect(card).to.contain.text(row[column.linktext])
              }
              if (column.image !== undefined) {
                cy.wrap(card).find('.rpl-card-content__image').invoke('attr', 'src').should('contain', row[column.image])
              }
              if (column.link !== undefined) {
                cy.wrap(card).find('.rpl-link').should('have.attr', 'href', row[column.link])
              }
            })
          })
        }
      })
    })
  })
})
Then(`the latest events titled {string} should have a call to action card with the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  // Find the correct carousel.
  cy.get('.rpl-latest-events').then(carousels => {
    carousels.each((index, carousel) => {
      cy.wrap(carousel).find('.rpl-latest-events__title').then(carouselTitle => {
        if (carouselTitle[0].innerHTML === title) {
          // For each data-row, check against latest event cta card.
          table.forEach((row, index) => {
            cy.wrap(carousel).find('.rpl-card-cta').eq(index).then(card => {
              if (column.title !== undefined) {
                expect(card).to.contain.text(row[column.title])
              }
              if (column.body !== undefined) {
                expect(card).to.contain.text(row[column.body])
              }
              if (column.linktext !== undefined) {
                expect(card).to.contain.text(row[column.linktext])
              }
              if (column.image !== undefined) {
                cy.wrap(card).find('.rpl-card-cta__image').invoke('attr', 'src').should('contain', row[column.image])
              }
              if (column.link !== undefined) {
                cy.wrap(card).should('have.attr', 'href', row[column.link])
              }
            })
          })
        }
      })
    })
  })
})
// Call to action
Then(`there should be a call to action component with the title {string}`, (title) => {
  cy.get('.rpl-call-to-action .rpl-call-to-action__title').should('contain', title)
})
Then(`the call to action component titled {string} should contain the following:`, (title, dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-call-to-action').then(callToActions => {
    callToActions.each((index, cta) => {
      cy.wrap(cta).find('.rpl-call-to-action__title').then(ctaTitle => {
        if (ctaTitle[0].innerHTML === title) {
          table.forEach(row => {
            if (column.title !== undefined) {
              expect(cta).to.contain.text(row[column.title])
            }
            if (column.summary !== undefined) {
              expect(cta).to.contain.text(row[column.summary])
            }
            if (column.linktext !== undefined) {
              expect(cta).to.contain.text(row[column.linktext])
            }
            if (column.link !== undefined) {
              cy.wrap(cta).find('.rpl-link').should('have.attr', 'href', row[column.link])
            }
            if (column.image !== undefined) {
              cy.wrap(cta).find('.rpl-call-to-action__image').invoke('attr', 'src').should('contain', row[column.image])
            }
          })
        }
      })
    })
  })
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
Then(`the contact component title should be {string}`, (title) => {
  cy.get('.rpl-contact .rpl-list__title').should('contain', title)
})
Then(`the contact component details should be {string}`, (details) => {
  cy.get('.rpl-contact .rpl-contact__contact-details').should('contain', details)
})
Then(`the contact component should have the following items:`, (dataTable) => {
  const column = {}
  dataTable.rawTable[0].forEach((col, index) => { column[col] = index })
  const table = dataTable.rawTable.slice(1)
  cy.get('.rpl-contact .rpl-list__list-item').then(listItem => {
    table.forEach((row, index) => {
      cy.wrap(listItem).eq(index).then(item => {
        if (column.linktext !== undefined) {
          expect(item).to.contain.text(row[column.linktext])
        }
        if (column.link !== undefined) {
          cy.wrap(item).find('.rpl-link').should('have.attr', 'href', row[column.link])
        }
      })
    })
  })
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
    cy.get('.rpl-share-this__list li').eq(index).then(shareLink => {
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

// Search results
Then(`the search results component should exist`, () => {
  cy.get('.rpl-search-results').should('exist')
})

// Description List
Then(`there should be a description list with the following items:`, (dataTable) => {
  const dl = dataTable.hashes()
  const labels = dl.map(label => `${label.term}: ${label.value}`)
  cy.get('.rpl-description-list__row').each(($el, index) => {
    const label = $el.text().trim()
    expect(labels).to.contain(label) //eslint-disable-line
  })
})

// Sitemap
Then(`the sitemap component should exist`, () => {
  cy.get('.rpl-sitemap-menu').should('exist')
})

//  Publication author information
Then(`the author information component should exist`, () => {
  cy.get('.rpl-author-information').should('exist')
})

Then(`the site section navigation should exist`, () => {
  cy.get('.rpl-site-section-navigation').should('exist')
})

Then(`the responsive image component should exist`, () => {
  cy.get('.rpl-responsive-image').should('exist')
})

Then(`the site section navigation should have the title {string}`, (title) => {
  cy.get('.rpl-site-section-navigation__title').should('contain', title)
})

Then(`the card collection component titled {string} should exist`, (title) => {
  cy.get('.app-card-collection').contains(title).should('exist')
})

Then(`the card collection component should have the {string} layout`, (layout) => {
  cy.get('.app-card-collection').should('have.class', `app-card-collection--${layout}`)
})

Then(`the card collection component should have the following cards`, dataTable => {
  const expectedItems = dataTable.hashes()
  expectedItems.forEach((item) => {
    cy.get(`.app-card-collection [data-card-collection-item="${item.uuid}"]`).then(card => {
      if (item.title) {
        expect(card).to.contain.text(item.title)
      }
      if (item.url) {
        cy.wrap(card).find('.rpl-link').should('have.attr', 'href', item.url)
      }
    })
  })
  cy.log(expectedItems)
})

Given(`the endpoint {string} returns fixture {string} with status {int}`, (route, fixture, status) => {
  cy.fixture(fixture).then((response) => {
    cy.task('setMockRoute', { route, status, response })
  })
})

Given(`the endpoint {string} with query {string} returns fixture {string} with status {int}`, (route, query, fixture, status) => {
  cy.fixture(fixture).then((response) => {
    cy.task('setMockRouteWithQuery', { route, status, response, query })
  })
})
