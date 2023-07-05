Feature: Home page

  Example of mocked page
  Background:
    Given the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/"

  @mockserver
  Scenario: On 404
    Given the endpoint "/api/tide/page" with query "?path=/404&site=8888" returns fixture "/errors/404" with status 404
    Given I visit the page "/404"

  @mockserver
  Scenario: On load
    Then the sidebar component with ID "26146cba-f307-449e-885c-7446efb3f315" should exist
    Then the sidebar component with ID "tide-sidebar-related-links" should exist
    Then the sidebar component with ID "tide-sidebar-social-share" should exist

  @mockserver
  Scenario: Hero header
    Then the hero title should be "Test landing page title"
    Then the hero intro text should be "Test landing page title introduction text"

  @mockserver
  Scenario: Hero acknowledgement
    Then the hero acknowledgement of country should exist on the page and read "Test hero acknowledgement"

  @mockserver
  Scenario: Primary campaign
    Then the "primary" campaign title should be "Demo primary campaign"
    Then the "primary" campaign summary should be "Test summary for primary campaign"
    Then the "primary" campaign image src should be "https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-skyline-at-dusk.jpg"
    Then the "primary" campaign CTA label should be "Testing CTA text"
    Then clicking the "primary" campaign CTA should take me to "/demo-destination"

  @mockserver
  Scenario: Secondary campaign
    Then the "secondary" campaign title should be "Demo secondary campaign"
    Then the "secondary" campaign summary should be "Test summary for secondary campaign"
    Then the "secondary" campaign image src should be "https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg"
    Then the "secondary" campaign CTA label should be "Testing secondary CTA text"
    Then clicking the "secondary" campaign CTA should take me to "/demo-secondary-destination"

  @mockserver
  Scenario: In page nav
    Then the in page nav should have the following items
      | text                 | url                  |
      | Content Anchor 1     | /#content-anchor-1   |
      | Content Anchor 2     | /#content-anchor-2   |
      | Test accordion title | /#page-component-972 |
      | Test timeline title  | /#page-component-992 |

  @mockserver
  Scenario: Header component - Intro banner
    Then an intro banner with ID "1030" should exist with the title "Test introduction banner"
    Then an intro banner with ID "1030" should exist with the summary "And here's the summary"
    Then an intro banner with ID "1030" should exist with the following links
      | text        | url          |
      | Test link 1 | /demo-link-1 |
      | Test link 2 | /demo-link-2 |

  @mockserver
  Scenario: Header component - Search banner
    Given the endpoint "/api/tide/page" with query "?path=/search/cats&site=8888" returns fixture "/landingpage/home" with status 200
    Then a search banner with ID "1911" should exist with the placeholder "Test search placeholder"
    Then in a search banner with ID "1911", searching for "cats" should take me to "/search/cats"

  @mockserver
  Scenario: Page component - Basic text
    Then a wysiwyg content area with ID "969" should exist with the content "Here is some sample rich text content"

  @mockserver
  Scenario: Page component - Accordion
    Then an accordion with ID "972" should exist with title "Test accordion title" and have the following accordion items
      | title        | content                   |
      | Accordion #1 | Test rich text content #1 |
      | Accordion #2 | Test rich text content #2 |

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
    And the card carousel with ID "1155" should contain a key dates card with the title "Key calendar dates" and the following entries
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
    Then a data table with ID "1936" should exist with the following structure
      | type | cell-one             | cell-two             | cell-three             |
      | th   | Row One Column One   | Row One Column Two   | Row One Column Three   |
      | td   | Row Two Column One   | Row Two Column Two   | Row Two Column Three   |
      | td   | Row Three Column One | Row Three Column Two | Row Three Column Three |
