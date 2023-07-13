Feature: Search listing table layout

  I can see a collection of results displayed in a tabular form

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture

  @mockserver
  Example: Grants
    Given the endpoint "/api/tide/page" with query "?path=/search-listing-table&site=8888" returns fixture "/search-listing/table/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

