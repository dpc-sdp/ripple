import { latestEvents } from './mapping-fetchers'

export const getCardCarouselEvents = async (mapping) => {
  // A little hack here to change latst event query limit to 9 for card carousel.
  latestEvents.args[3] = {
    offset: 0,
    limit: 9
  }
  return mapping.filter(mapping.fetch(latestEvents), ['eventLatestEvents']).then(cards => {
    // Reassemble the data with a component name data structure so we can render them by vue dynamic components.
    return cards.map(card => {
      return {
        name: 'rpl-card-event',
        data: card
      }
    })
  })
}
