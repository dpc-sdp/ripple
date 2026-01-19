import featureData from './__fixture__/features.json'

const baseProps = {
  features: featureData,
  provider: 'vicmap',
  projection: 'EPSG:3857',
  clusteringDistance: 0
}
const coords = {
  vic: [16193060, -4383467],
  horsham: [15829631, -4399691]
}
const pins = { horsham: [77, 295] }

describe('RplMap', () => {
  it('mounts', () => {
    cy.mountMap({ props: baseProps })

    cy.get('.rpl-map canvas').should('exist')
  })

  it('centers on active pin', () => {
    cy.mountMap({ props: baseProps })

    cy.get('.rpl-map').as('map')

    cy.get('@map').find('canvas').click(pins['horsham'][0], pins['horsham'][1])
    cy.wait(1500)

    cy.get('@map').find('.rpl-map-popup').should('exist')

    cy.get('@map')
      .should('have.attr', 'data-center')
      .then((center) => {
        const [x, y] = center.split(',').map(parseFloat)
        expect(x).to.be.closeTo(coords['horsham'][0], 1)
        expect(y).to.be.closeTo(coords['horsham'][1], 1)
      })
  })

  it('updates canvas title on pin hover', () => {
    cy.mountMap({ props: baseProps })

    cy.get('.rpl-map canvas').as('map')

    cy.get('@map').trigger('pointermove', {
      clientX: pins['horsham'][0],
      clientY: pins['horsham'][1]
    })

    cy.get('@map').should('have.attr', 'title', 'Horsham')
  })

  it('allows overriding the single click function', () => {
    const fakeTitle = 'Horsham override'
    cy.mountMap({
      props: {
        ...baseProps,
        onMapClick: () => {
          document.querySelector('canvas').setAttribute('title', fakeTitle)
        }
      }
    })

    cy.get('.rpl-map').as('map')

    cy.get('@map').find('canvas').click(pins['horsham'][0], pins['horsham'][1])
    cy.wait(1000)

    cy.get('@map').find('canvas').should('have.attr', 'title', fakeTitle)

    cy.get('@map')
      .should('have.attr', 'data-center')
      .then((center) => {
        const [x, y] = center.split(',').map(parseFloat)
        expect(x).to.be.closeTo(coords['vic'][0], 1)
        expect(y).to.be.closeTo(coords['vic'][1], 1)
      })
  })

  it('allows overriding the map move function', () => {
    const fakeTitle = 'Horsham is a go'

    cy.mountMap({
      props: {
        ...baseProps,
        onPointerMove: () => {
          document.querySelector('canvas').setAttribute('title', fakeTitle)
        }
      }
    })

    cy.get('.rpl-map canvas').as('map')

    cy.get('@map').trigger('pointermove', {
      clientX: pins['horsham'][0],
      clientY: pins['horsham'][1]
    })

    cy.get('@map').should('have.attr', 'title', fakeTitle)
  })
})
