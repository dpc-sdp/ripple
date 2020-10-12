Feature: Landing page card collection

  As a citizen I can view a list of cards
  
  @skip
  Scenario: BE - Create landing page
    # Need to work out how to create a card collection via YAML
    Given I have logged into the backend
    And in the backend there is a node at "/test-card-collection" with "modules/landingPage/card-collection" data
  

  @skip @mocksearch
  Scenario: Events grid two pages
    Given the endpoint "/search-api/v2/cards" returns fixture "modules/landingPage/cards-1" with status 200
    Given the endpoint "/search-api/v2/cards" with query "?type=event&filters%5Btype%5D%5Bvalues%5D=event&filters%5Btype%5D%5Boperator%5D=OR&filters%5Bfield_topic%5D%5Boperator%5D=OR&filters%5Bfield_tags%5D%5Boperator%5D=OR&sort%5B%5D%5Bchanged%5D=desc&limit=9&site=4&page=2" returns fixture "modules/landingPage/cards-2" with status 200
    When I visit the page "/test-card-collection"
    Then the card collection component titled "test" should exist
    And the card collection component should have the "grid" layout
    And the card collection component should have the following cards
      | uuid | title        | url                       | imagesrc                                                                                                        | tag   | date     | summary                                                                                                |
      | 1    | Mock event 1 | //demo.vic.gov.au/event-1 | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 2    | Mock event 2 | /event-2                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 3    | Mock event 3 | /event-3                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 4    | Mock event 4 | /event-4                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 5    | Mock event 5 | /event-5                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 6    | Mock event 6 | /event-6                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 7    | Mock event 7 | /event-7                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 8    | Mock event 8 | /event-8                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
      | 9    | Mock event 9 | /event-9                  | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | Event | 24 April | ACMI's Game Builder is an online resource for teachers and students making their very first videogame. |
    And the pagination component should exist
    And the pagination component should have 2 steps
    And page 1 should be active in the pagination component
    When I click the pagination item 2
    Then the card collection component should have the following cards
      | uuid | title     | url     | imagesrc                                                                                                        | topic      | summary                                                                                                                                                                                                  |
      | 1    | Mock page | /page-1 | https://nginx-php-content-vic-pr-954.lagoon.vicsdp.amazee.io/sites/default/files/2020-04/gaming-gamebuilder.jpg | DEMO TOPIC | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu |

  @skip @mocksearch
  Scenario: Landing page Carousel
    Given the endpoint "/search-api/v2/cards" returns fixture "modules/landingPage/cards-2" with status 200
    When I visit the page "/test-listing-carousel"
    Then the card collection component titled "Carousel test" should exist
    And the card collection component should have the "carousel" layout
    And the pagination component should not exist
