Feature: Searching listing - Errors

  As a user I get notified of problems on the search listing page

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: No results message
    Given the endpoint "/api/tide/page" with query "?path=/errors&site=8888" returns fixture "/search-listing/errors/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/errors"

    Then the no results message should show with the search term ""

    When I type "test123" into the search input
    When I click the search button

    Then the no results message should show with the search term "test123"

    When I clear the search input
    And I type "blahblah" into the search input

    Then the no results message should show with the search term "test123"

    When I click the search button

    Then the no results message should show with the search term "blahblah"

  @mockserver
  Example: Search error
    Given the endpoint "/api/tide/page" with query "?path=/errors&site=8888" returns fixture "/search-listing/errors/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-error" and status 403
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/errors"

    Then the search error message should be displayed
