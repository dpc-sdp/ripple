Feature: Events collection

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: Results formatting
    Given the page endpoint for path "/events" returns fixture "/search-listing/events/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/events/response" and status 200
    When I visit the page "/events"
    Then the search listing page should have 4 results
    And the search listing layout should be "grid"
    And the search network request should be called with the "/search-listing/events/request" fixture
    And the event search listing results should have following items:
      | title              | url                 | date                      | content                                                                                                                       | location  |
      | Autumn Garden Tour | /autumn-garden-tour | 4 March 2023              | A special guided tour of the Shrine Reserve including Devonshire Tea.                                                         | Melbourne |
      | March to Art       | /march-art          | 19 March to 21 March 2023 | Join us for a relaxing afternoon of folk, indie, jazz & contemporary music and performances by veteran musicians and artists. | Bendigo   |
