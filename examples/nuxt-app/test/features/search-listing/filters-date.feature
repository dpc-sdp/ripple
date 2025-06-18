Feature: Search listing - Filter
  As a user I can apply filters to my search

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device
  #@mockserver
  #Example: Date range filter (query range matches end date) - Should correctly query search API
  #  Given the page endpoint for path "/filters" returns fixture "/search-listing/events/page" with status 200
  #  And the search network request is stubbed with fixture "/search-listing/events/response" and status 200
  #  When I visit the page "/filters?dateRangeFilter=to:2025-06-28"
  #  And the search network request should be called with the "/search-listing/events/request-date-range-end" fixture
  #  Then the filters toggle should show 1 applied filters
  #  When I toggle the search listing filters section
  #  Then the search listing date range field labelled "Date range example" should have the values
  #    | from | to         |
  #    |      | 2025-06-28 |

  @mockserver
  Example: Date select filter
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page-date-select" with status 200
    And the search network request is stubbed with fixture "/search-listing/events/response" and status 200
    When I visit the page "/filters?dateSelectFilter=2025-06-28"
    And the search network request should be called with the "/search-listing/events/request-date-range-end" fixture
    Then the filters toggle should show 1 applied filters
    When I toggle the search listing filters section
    Then the search listing date range field labelled "Date range example" should have the values
      | from | to         |
      |      | 2025-06-28 |
