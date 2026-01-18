import featureData from './__fixture__/features.json'

const coords = {
  vic: [16193060, -4383467],
  horsham: [15829631, -4399691]
}
const pins = { horsham: [77, 295] }

describe('RplMap', () => {
  it('mounts', () => {
    cy.mountMap({
      props: {
        features: featureData,
        provider: 'vicmap',
        projection: 'EPSG:3857'
      }
    })
    cy.get('.rpl-map canvas').should('exist')
  })

  it('centers on active pin', () => {
    cy.mountMap({
      props: {
        features: featureData,
        provider: 'vicmap',
        projection: 'EPSG:3857',
        clusteringDistance: 0
      }
    })
    cy.get('.rpl-map').as('map')

    cy.get('@map').find('canvas').click(pins['horsham'][0], pins['horsham'][1])
    cy.wait(1500)

    cy.get('@map')
      .should('have.attr', 'data-center')
      .then((center) => {
        const [x, y] = center.split(',').map(parseFloat)
        expect(x).to.be.closeTo(coords['horsham'][0], 1)
        expect(y).to.be.closeTo(coords['horsham'][1], 1)
      })
  })

  it('can disable centering on active pin', () => {
    cy.mountMap({
      props: {
        features: featureData,
        provider: 'vicmap',
        projection: 'EPSG:3857',
        clusteringDistance: 0,
        centerActivePin: false
      }
    })
    cy.get('.rpl-map').as('map')

    cy.get('@map').find('canvas').click(pins['horsham'][0], pins['horsham'][1])
    cy.wait(1000)

    cy.get('@map')
      .should('have.attr', 'data-center')
      .then((center) => {
        const [x, y] = center.split(',').map(parseFloat)
        expect(x).to.be.closeTo(coords['vic'][0], 1)
        expect(y).to.be.closeTo(coords['vic'][1], 1)
      })
  })
})
