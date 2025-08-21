import RplLinkList from './RplLinkList.vue'
import RplLinkListItem from './RplLinkListItem.vue'

describe('RplLinkList', () => {
  it('mounts when empty', () => {
    cy.mount(RplLinkList)
  })

  it('mounts with slot contents', () => {
    cy.mount(RplLinkList, {
      slots: { default: 'testSlotContents' }
    })

    cy.get('.rpl-link-list').should('contains.text', 'testSlotContents')
  })
})

describe('RplLinkListItem', () => {
  it('mounts', () => {
    cy.mount(RplLinkListItem, {
      props: { url: '/test/url' },
      slots: { default: 'testSlotContents' }
    })

    cy.get('.rpl-link-list-item__link').should(
      'contains.text',
      'testSlotContents'
    )
    cy.get('.rpl-link-list-item__link').should('have.attr', 'href', '/test/url')
  })
})
