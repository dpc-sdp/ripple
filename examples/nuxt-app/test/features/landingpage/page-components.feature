Feature: Home page

  Example of mocked page
  Background:
    Given the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/"

  @mockserver
  Scenario: Page component - Basic text
    Then a wysiwyg content area with ID "969" should exist with the content "Here is some sample rich text content"

  @mockserver
  Scenario: Page component - Accordion
    Then an accordion with ID "972" should exist with title "Test accordion title" and have the following accordion items
      | title        | content                   |
      | Accordion #1 | Test rich text content #1 |
      | Accordion #2 | Test rich text content #2 |
    And the accordion with ID "972" should display the description "Test accordion description"

  @mockserver
  Scenario: Page component - Accordion (Open/close all)
    When I click the open all button on accordion with ID "accordion-972"
    Then all accordion items in accordion ID "accordion-972" should be visible

    When I click the close all button on accordion with ID "accordion-972"
    Then all accordion items in accordion ID "accordion-972" should be hidden

  @mockserver
  Scenario: Page component - Promo card
    Then a promo card with ID "976" should exist with the following properties
      | displayStyle | title                | content            | image |
      | noImage      | Promo card (noImage) | Sample description |       |

    Then a promo card with ID "977" should exist with the following properties
      | displayStyle | title                  | content            | image                                                                                                     |
      | thumbnail    | Promo card (thumbnail) | Sample description | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg |

    Then a promo card with ID "978" should exist with the following properties
      | displayStyle | title                | content            | image                                                                                                     |
      | profile      | Promo card (profile) | Sample description | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg |

  @mockserver
  Scenario: Page component - Nav card
    Then a nav card with ID "981" should exist with the following properties
      | displayStyle | title              | content            | image |
      | noImage      | Nav card (noImage) | Sample description |       |

    Then a nav card with ID "982" should exist with the following properties
      | displayStyle | title                | content            | image                                                                                                     |
      | thumbnail    | Nav card (thumbnail) | Sample description | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg |

    Then a nav card with ID "983" should exist with the following properties
      | displayStyle | title               | content            | image                                                                                                     |
      | featured     | Nav card (featured) | Sample description | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg |


  @mockserver
  Scenario: Page component - Key dates card
    Then a key dates card with ID "988" should exist with the title "Key calendar dates"
    Then a key dates card with ID "988" should exist with the following dates
      | title         | date              | summary                  |
      | An event      | 12th October 2022 | Summary of an event      |
      | Another event | 13th October 2022 | Summary of another event |
    Then a key dates card with ID "988" should exist with cta text "Test CTA text" and link to "/test-cta-link"

  @mockserver
  Scenario: Page component - Timeline
    Then a timeline with ID "992" should exist with the title "Test timeline title"
    Then a timeline with ID "992" should exist with the following items
      | title             | date                     | summary                   | url                 | image                                                                                                                  |
      | Milestone 1 title | 2 June to 11 November    | Milestone 1 summary field | /test-destination-1 | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/VicFleet-Police-car-on-road.jpg |
      | Milestone 2 title | 4 October to 17 November | Milestone 2 summary field | /test-destination-2 |                                                                                                                        |
      | Milestone 3 title |                          | Milestone 3 text          |                     |                                                                                                                        |

  @mockserver
  Scenario: Page component - Call to action
    Then a call to action with ID "1024" should exist with the following properties
      | title                     | summary                 | ctaText       | image                                                                                                                         |
      | Test call to action title | This is the description | Test CTA text | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Two-men-working-in-hi-vis-clothing.jpg |

  @mockserver
  Scenario: Page component - Stats grid
    Then a stats grid with ID "1028" should exist with the following items
      | label   | value   |
      | Label 1 | Value 1 |
      | Label 2 | Value 2 |

  @mockserver
  Scenario: Page component - Card carousel
    Given a card carousel with ID "1155" should exist with the following promo cards
      | title           | date            | content                | url          | image                                                                                                                             |
      | Sample title    | 1 Dec to 31 Dec | Sample Card Summary    | /sample-page | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg |
      | Promotion title | 3 Nov 2022      | Promotion Card summary | /promo-page  | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Engage-Vic-photo-hero.jpeg                 |
    And the card carousel with ID "1155" should contain a key dates card with the title "Key calendar dates", link "/dates" and the following entries
      | title        | subtitle       | content       |
      | April 16th   | Key subtitle 1 | Key content 1 |
      | December 1st | Key subtitle 2 | Key content 2 |

  @mockserver
  Scenario: Page component - Card carousel (Slider)
    When I click the button "Next" on the component with ID "1155"
    Then the active slide on "1155" should be "2"
    And the pagination button "Next" on "1155" should be disabled
    When I click the button "Previous" on the component with ID "1155"
    Then the active slide on "1155" should be "1"
    And the pagination button "Previous" on "1155" should be disabled

  @mockserver
  Scenario: Page component - Media Gallery
    Given a media gallery with ID "1056" should exist with the following gallery items
      | title             | caption                  | image                                                                                                                             |
      | Media title one   | The first media caption  | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg                   |
      | Media title two   | The second media caption | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg |
      | Media title three | The third media caption  | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg                       |

  @mockserver
  Scenario: Page component - Media Gallery (Slider)
    Given the pagination button "Previous" on "1056" should be disabled
    When I click the button "Next" on the component with ID "1056"
    Then the active slide on "1056" should be "2"
    When I click the button "Next" on the component with ID "1056"
    Then the active slide on "1056" should be "3"
    And the pagination button "Next" on "1056" should be disabled
    When I click the button "Previous" on the component with ID "1056"
    Then the active slide on "1056" should be "2"

  @mockserver
  Scenario: Page component - Media Gallery (Modal)
    When I click the button "View 'Media title one' fullscreen" on the component with ID "1056"
    Then the "media-gallery" modal should be "visible"
    When I click the "media-gallery" modal button "Close"
    Then the "media-gallery" modal should be "hidden"

  @mockserver
  Scenario: Page component - Data Table
    Given a data table with ID "1936"
    Then it should have a heading
    And have 3 rows and 3 columns
      | type | cell-one             | cell-two             | cell-three             |
      | th   | Row One Column One   | Row One Column Two   | Row One Column Three   |
      | td   | Row Two Column One   | Row Two Column Two   | Row Two Column Three   |
      | td   | Row Three Column One | Row Three Column Two | Row Three Column Three |

  @mockserver
  Scenario: Page component - Data Table without headings
    Given a data table with ID "1937"
    Then it should have no heading
    And have 2 rows and 3 columns
      | type | cell-one             | cell-two             | cell-three             |
      | td   | Row Two Column One   | Row Two Column Two   | Row Two Column Three   |
      | td   | Row Three Column One | Row Three Column Two | Row Three Column Three |

  @mockserver
  Scenario: Page component - Category Grid i.e. compact cards
    Then a category grid with ID "7052" should exist with the following cards
      | title    | content          | image                                                                                                                             | url                 |
      | Card one | Card one summary | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg | /landing-page-cc-2  |
      | Card two | Card two summary | https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg                   | https://google.com/ |
