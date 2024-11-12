Feature: Content collection

  Background:
    Given I load the site fixture with "/site/reference"
    And the page endpoint for path "/" returns fixture "/landingpage/content-collection" with status 200

  @mockserver
  Scenario: Page component - Content collection (elasticsearch)
    Given the "/**/_search" network request is stubbed with fixture "/landingpage/content-collection-response-elasticsearch" and status 200 as alias "ccReq"
    And the feature flag "contentCollectionSearchConnector" is set to "elasticsearch"
    And the site endpoint returns the loaded fixture
    When I visit the page "/"
    Then the content collection with ID "2192" exist with the following cards
      | title          | content                              | image                    | url        |
      | News for CC 01 | NP1 Etiam scelerisque lorem sit amet | /placeholders/medium.png | /news-cc-1 |
      | News for CC 02 | NP2 Pellentesque a pharetra magna    |                          | /news-cc-2 |

  @mockserver
  Scenario: Page component - Content collection (appSearch)
    Given the "/api/as/v1/engines/**/search.json" network request is stubbed with fixture "/landingpage/content-collection-response-appsearch" and status 200 as alias "ccReq"
    And the feature flag "contentCollectionSearchConnector" is set to "appSearch"
    And the site endpoint returns the loaded fixture
    When I visit the page "/"
    Then the content collection with ID "2192" exist with the following cards
      | title            | content                              | image                    | url        |
      | News for CC 1 AS | NP1 Etiam scelerisque lorem sit amet | /placeholders/medium.png | /news-cc-1 |
      | News for CC 2 AS | NP2 Pellentesque a pharetra magna    |                          | /news-cc-2 |
