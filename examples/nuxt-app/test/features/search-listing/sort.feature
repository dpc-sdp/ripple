Feature: Search listing - Filter

  As a user I can see search results sorted in a useful way

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Custom sort from config
    Given the page endpoint for path "/sort" returns fixture "/search-listing/sort/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/sort/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/sort"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/sort/request" fixture
