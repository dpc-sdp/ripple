Feature: Grid collection

  As a site I can see a collection of links to other pages in a grid and interact with it to find the one I want.

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Emergency resource portal
    Given the endpoint "/api/tide/page" with query "?path=/search-list-grid&site=8888" returns fixture "/search-listing/grid/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grid/response" and status 200
    When I visit the page "/search-list-grid"
    Then the search listing page should have 9 results
    Then the search listing layout should be "grid"
    And the search network request should be called with the "/search-listing/grid/request" fixture
