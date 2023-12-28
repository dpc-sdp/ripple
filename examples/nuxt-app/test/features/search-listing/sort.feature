Feature: Search listing - Filter

  As a user I can see search results sorted in a useful way

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Custom sort from config
    Given the page endpoint for path "/sort" returns fixture "/search-listing/sort/page-custom-sort" with status 200
    And the search network request is stubbed with fixture "/search-listing/sort/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/sort"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/sort/request-custom-sort" fixture

  @mockserver
  Example: Sort dropdown - no dropdown
    Given the page endpoint for path "/sort" returns fixture "/search-listing/sort/page-custom-sort" with status 200
    And the search network request is stubbed with fixture "/search-listing/sort/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/sort"
    Then the search listing page should have 2 results
    And the sort dropdown should not be visible

  @mockserver
  Example: Sort dropdown - default
    Given the page endpoint for path "/sort" returns fixture "/search-listing/sort/page-sort-dropdown" with status 200
    And the search network request is stubbed with fixture "/search-listing/sort/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/sort"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/sort/request-a-z" fixture

    Then the sort dropdown should be visible
    And the sort dropdown should have the "A to Z" option selected

    When I click "Date last updated" from the select field with label "Sort by"

    Then the search network request should be called with the "/search-listing/sort/request-last-updated" fixture
    And the URL should reflect that the current sort option is "last-updated"
    And the sort dropdown should have the "Date last updated" option selected

  @mockserver
  Example: Sort dropdown - populating from URL
    Given the page endpoint for path "/sort" returns fixture "/search-listing/sort/page-sort-dropdown" with status 200
    And the search network request is stubbed with fixture "/search-listing/sort/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/sort?sort=last-updated&page=3"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/sort/request-last-updated-url" fixture

    Then the sort dropdown should be visible
    And the sort dropdown should have the "Date last updated" option selected
    And the URL should reflect that the current sort option is "last-updated"
    And the URL should reflect that the current page number is 3


    When I click "A to Z" from the select field with label "Sort by"

    Then the search network request should be called with the "/search-listing/sort/request-a-z" fixture
    And the URL should reflect that the current sort option is "a-to-z"
    And the URL should reflect that the current page number is 1
    And the sort dropdown should have the "A to Z" option selected
