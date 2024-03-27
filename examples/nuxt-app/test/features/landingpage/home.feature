Feature: Home page

  Example of mocked page

  Background:
    Given the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/"

  @mockserver
  Scenario: On 404
    Given the page endpoint for path "/404" returns fixture "/errors/404" with status 404
    Given I visit the page "/404"

  @mockserver
  Scenario: Hero header
    Then the hero title should be "Test landing page title"
    Then the hero intro text should be "Test landing page title introduction text"
    And the hero should display the following items
      | text               | url                                               |
      | Test link 1        | /embedded-video-test                              |
      | Test link 2        | /sdpta-statistics-grid-eight-landing-page-fixture |
      | Test link 3        | /sdpta-accordion-landing-page-fixture             |
      | Test link external | https://www.vic.gov.au/                           |

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
    Given the page endpoint for path "/search/cats" returns fixture "/landingpage/home" with status 200
    Then a search banner with ID "1911" should exist with the placeholder "Test search placeholder"
    Then in a search banner with ID "1911", searching for "cats" should take me to "/search/cats"
