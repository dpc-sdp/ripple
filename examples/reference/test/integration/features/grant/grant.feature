Feature: Grant

  As a citizen I want to see details for a given grant.

  Scenario: On load - desktop
    Given the mock server has started
    And I am using a "macbook-13" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/tc-9a-grant-simple-test-date-range&site=4" returns fixture "grant/sample" with status 200
    When I visit the page "/tc-9a-grant-simple-test-date-range"

  Scenario: Page layout
    Then the site footer is visible
    And the share this component should exist
    And the breadcrumbs should exist

  Scenario: Overview
    Then the grant overview title should be "Overview title"
    And the grant overview price should be "$11,326"
    And the grant overview audience should be "Businesses"
    And the grant overview open status is "Closed"

  Scenario: Timeline
    Then the timeline title should be "Demo Timeline"
    And there should be the following timeline items:
      | image                                                                                       | title                | link                   | subtitle    | description                                                                                 |
      | https://develop.content.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg | Demo Timeline Item   | https://www.google.com | 01 January  | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. |
      | https://develop.content.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg | Demo Timeline Item 2 | https://www.google.com | Alternative | Anim excepteur magna eu aliqua quis velit voluptate sit culpa.                              |

  Scenario: Documents
    Then the page should have the following documents:
      | title                | size    | type |
      | Demo Sample Document | 7.53 KB | docx |

  Scenario: Guidelines
    Then the grant guideline section title should be "Guidelines"
    And the grant guideline should have the following accordions
      | title               | content     |
      | Eligibility         | Lorem ipsum |
      | Assessment criteria | Lorem ipsum |
      | Assessment process  | Lorem ipsum |
      | How to apply        | Lorem ipsum |
    And the grant guideline with title "Assessment process" opens when clicked
