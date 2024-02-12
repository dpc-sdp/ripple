Feature: No results

  Render a component when no results match a given search, allow the use of a custom component

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Empty response
    Given the page endpoint for path "/search-list-grid" returns fixture "/search-listing/grid/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/search-list-grid"
    Then the search listing page should have 0 results

  @mockserver
  Example: Empty response with custom component
    Given the page endpoint for path "/search-list-custom" returns fixture "/search-listing/no-results/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/search-list-custom"
    Then the search listing page should have 0 results
