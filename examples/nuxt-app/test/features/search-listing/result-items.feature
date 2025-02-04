Feature: Result items

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Result item type can be set per result
    Given the page endpoint for path "/search-results" returns fixture "/search-listing/result-items/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/result-items/response" and status 200

    When I visit the page "/search-results"
    Then the search listing page should have 4 results
    Then the search listing results should have following items:
      | title                    | component                |
      | International conference | tide-event-search-result |
      | Accessibility guidelines | tide-search-result-card  |
      | Small business grant     | tide-grant-search-result |
      | GovHack 2022 is coming   | tide-search-result       |

  @mockserver
  Example: Result contents from elasticsearch can be customised to exclude fields
    Given I load the page fixture with "/search-listing/result-items/page"
    And the search listing config has the following excludes added to source
      | key             |
      | nid             |
      | field_node_site |
    Then the page endpoint for path "/search-results" returns the loaded fixture
    And the search network request is stubbed with fixture "/search-listing/result-items/response" and status 200

    When I visit the page "/search-results"
    Then the search listing page should have 4 results
    And the search network request should be called with the "/search-listing/result-items/request-source-exclude" fixture

  @mockserver
  Example: Result contents from elasticsearch can be customised to include fields
    Given I load the page fixture with "/search-listing/result-items/page"
    And the search listing config has the following includes added to source
      | key           |
      | title         |
      | field_summary |
    Then the page endpoint for path "/search-results" returns the loaded fixture
    And the search network request is stubbed with fixture "/search-listing/result-items/response" and status 200

    When I visit the page "/search-results"
    Then the search listing page should have 4 results
    And the search network request should be called with the "/search-listing/result-items/request-source-include" fixture
