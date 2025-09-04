Feature: List layout

  As a site I can see a collection of links to other pages in a list format

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Results are displayed in a list with default skeleton loader
    Given the page endpoint for path "/search-list" returns fixture "/search-listing/list/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/list/response", status 200 and delayed by 400 milliseconds
    When I visit the page "/search-list"
    Then the search listing skeleton should display 9 items with the class "tide-search-result-skeleton"

    When I wait 500 milliseconds
    Then the search listing page should have 3 results
    Then the search listing layout should be "list"
    And the search network request should be called with the "/search-listing/list/request" fixture
    And the search listing results count should read "Displaying 1-9 of 124 results"
    And the search listing results should have following items:
      | title                    | content                                       | url                                     | component          |
      | 2-BE-event-1             | The ingenious hero who travelled far and wide | /2-be-event-1                           | tide-search-result |
      | 5-BE-land-3 Landing Page | Outside thundered the approaching surf of war | /5-be-land-3-landing-page-complete-test | tide-search-result |
      | Accessibility - demo     | Accessibility information about this website. | https://vic.gov.au/page                 | tide-search-result |

  @mockserver
  Example: A custom skeleton loader can be use for list result items
    Given I load the page fixture with "/search-listing/list/page"
    And the search listing result skeleton is set to the "TideSearchResultExampleSkeleton" component
    And the search network request is stubbed with fixture "/search-listing/list/response", status 200 and delayed by 400 milliseconds
    Then the page endpoint for path "/search-list" returns the loaded fixture

    When I visit the page "/search-list"
    Then the search listing skeleton should display 9 items with the class "tide-search-results-example-skeleton"
