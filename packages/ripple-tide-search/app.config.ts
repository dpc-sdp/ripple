import rplAddressSuggestionsFn from './utils/rplAddressSuggestionsFn'

export default defineAppConfig({
  ripple: {
    search: {
      contentTypes: [
        'landing_page',
        'event',
        'grant',
        'news',
        'publication',
        'publication_page',
        'tide_search_listing'
      ],
      suggestionsFunctions: {
        rplAddressSuggestionsFn
      },
      topicSize: 20
    }
  }
})
