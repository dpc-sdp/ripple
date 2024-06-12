Feature: Grid layout

  As a site I can see a collection of links to other pages in a grid and interact with it to find the one I want.

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Results are display in a grid format with default skeleton loader
    Given the page endpoint for path "/search-grid" returns fixture "/search-listing/grid/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grid/response", status 200 and delayed by 400 milliseconds
    When I visit the page "/search-grid"
    Then the search listing skeleton should display 9 items with the class "tide-search-result-card-skeleton"

    When I wait 500 milliseconds
    Then the search listing page should have 9 results
    Then the search listing layout should be "grid"
    And the search network request should be called with the "/search-listing/grid/request" fixture
    And the search listing results count should read "Displaying 1-9 of 55 results"
    And the search listing results should have following items:
      | title                                            | content                                                                             | component               |
      | Strategy for Aboriginal Community-led Recovery   | The Strategy for Aboriginal Community-led Recovery                                  | tide-search-result-card |
      | Emergency Recovery Victoria - Recovery Framework | This recovery framework provides a consistent and community-led approach            | tide-search-result-card |
      | Community Recovery Toolkit                       | This toolkit provides practical advice on recovery processes, approaches, and tools | tide-search-result-card |

  @mockserver
  Example: A custom skeleton loader can be use for grid result items
    Given I load the page fixture with "/search-listing/grid/page"
    And the search listing result skeleton is set to the "TideSearchResultExampleSkeleton" component
    And the search network request is stubbed with fixture "/search-listing/grid/response", status 200 and delayed by 400 milliseconds
    Then the page endpoint for path "/search-grid" returns the loaded fixture

    When I visit the page "/search-grid"
    Then the search listing skeleton should display 9 items with the class "tide-search-results-example-skeleton"
