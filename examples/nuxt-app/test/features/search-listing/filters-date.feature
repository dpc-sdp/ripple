Feature: Search listing - Filter
  As a user I can apply filters to my search

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Date select range smoke test (to and from prefilled)
    Given the page endpoint for path "/range" returns fixture "/search-listing/filters/page-date-select" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    When I visit the page "/range?dateSelectFilter=from:5/09/2023&dateSelectFilter=to:10/09/2025"
    And the search network request should be called with the "/search-listing/grants/request-date-range" fixture

  @mockserver
  Example: Date select TO smoke test (to prefilled)
    Given the page endpoint for path "/range" returns fixture "/search-listing/filters/page-date-select" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    When I visit the page "/range?dateSelectFilter=dateSelectFilter=to:10/09/2025"
    And the search network request should be called with the "/search-listing/grants/request-date-range-to" fixture

  @mockserver
  Example: Date select FROM smoke test (from prefilled)
    Given the page endpoint for path "/range" returns fixture "/search-listing/filters/page-date-select" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    When I visit the page "/range?dateSelectFilter=from:5/09/2023"
    And the search network request should be called with the "/search-listing/grants/request-date-range-from" fixture
