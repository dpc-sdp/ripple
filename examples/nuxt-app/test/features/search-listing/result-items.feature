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
