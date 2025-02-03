Feature: Custom Collection

  As an editor I want to be able to add a view of results in a search index to a landing page.

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device

  @mockserver
  Scenario: Custom collection
    Given the page endpoint for path "/custom-collection" returns fixture "/landingpage/custom-collection" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection"
    Then the landing page component "TideCustomCollection" should exist
    And the custom collection component should have a search input bar
    And the custom collection component results count should read "Displaying 1-10 of 282 results"
    And the "cslReq" network request should be made to the elasticsearch endpoint
    And the search listing layout should be "table"

  @mockserver
  Scenario: Custom collection emits search related events for analytics
    Given the page endpoint for path "/custom-collection" returns fixture "/landingpage/custom-collection/page" with status 200
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200

    When I visit the page "/custom-collection"
    And I wait 400 milliseconds
    Then I type "the" into the custom collection input
    Then I toggle the content collection filters
    When I click the search listing dropdown field labelled "Topics"
    And I click the option labelled "Another Demo Topic" in the selected dropdown
    When I click the search listing dropdown field labelled "Topics"
    And I submit the search filters
    And I wait 400 milliseconds
    Then I clear the search filters
    Then I toggle the content collection filters
    And I click 'next' in the pagination controls
    And I wait 400 milliseconds

    Then the dataLayer should include the following events
      | event                | name                   | element_id          | element_text         | filters                  | count | label | component              | index |
      | view_search_results  | Test custom collection | page-component-4470 |                      |                          | 282   |       | tide-custom-collection | 1     |
      | open_filters         | Test custom collection | page-component-4470 | Filters              |                          |       | the   | tide-custom-collection |       |
      | search               | Test custom collection | page-component-4470 | Apply search filters | topic=Another+Demo+Topic |       | the   | tide-custom-collection |       |
      | view_search_results  | Test custom collection | page-component-4470 |                      | topic=Another+Demo+Topic | 282   | the   | tide-custom-collection | 1     |
      | clear_search_filters | Test custom collection | page-component-4470 | Clear search filters | topic=Another+Demo+Topic | 282   | the   | tide-custom-collection |       |
      | view_search_results  | Test custom collection | page-component-4470 |                      |                          | 282   |       | tide-custom-collection | 1     |
      | close_filters        | Test custom collection | page-component-4470 | Filters              |                          |       |       | tide-custom-collection |       |
      | paginate_next        | Test custom collection | page-component-4470 | Next                 |                          | 282   |       | tide-custom-collection | 2     |
      | view_search_results  | Test custom collection | page-component-4470 |                      |                          | 282   |       | tide-custom-collection | 2     |

  @mockserver
  Scenario: Default page - default form theme
    Given the page endpoint for path "/custom-collection-theme-default" returns fixture "/landingpage/custom-collection/form-theme-default" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection-theme-default"
    Then the landing page component "TideCustomCollection" should exist
    And I toggle the content collection filters
    Then the custom collection component should not have the "neutral" form theme applied
    Then the custom collection search bar field should have the "default" variant applied
    Then the custom collection checkbox field labelled "Show archived content" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Term filter example" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Terms dependent example" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Terms dependent child example" should have the "default" variant applied
    And the custom collection checkbox group labelled "Checkbox group" should have the "default" variant applied
    And the custom collection date range field labelled "Date range example" should have the "default" variant applied

  @mockserver
  Scenario: Default page - reverse form theme
    Given the page endpoint for path "/custom-collection-theme-reverse" returns fixture "/landingpage/custom-collection/form-theme-reverse" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection-theme-reverse"
    Then the landing page component "TideCustomCollection" should exist
    And I toggle the content collection filters
    Then the custom collection component should have the "neutral" form theme applied
    Then the custom collection search bar field should have the "reverse" variant applied
    Then the custom collection checkbox field labelled "Show archived content" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Term filter example" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Terms dependent example" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Terms dependent child example" should have the "reverse" variant applied
    And the custom collection checkbox group labelled "Checkbox group" should have the "reverse" variant applied
    And the custom collection date range field labelled "Date range example" should have the "reverse" variant applied

  @mockserver
  Scenario: Alt page - default form theme
    Given the page endpoint for path "/custom-collection-alt-theme-default" returns fixture "/landingpage/custom-collection/alt-form-theme-default" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection-alt-theme-default"
    Then the landing page component "TideCustomCollection" should exist
    And I toggle the content collection filters
    Then the custom collection component should not have the "light" form theme applied
    Then the custom collection search bar field should have the "reverse" variant applied
    Then the custom collection checkbox field labelled "Show archived content" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Term filter example" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Terms dependent example" should have the "reverse" variant applied
    Then the custom collection dropdown field labelled "Terms dependent child example" should have the "reverse" variant applied
    And the custom collection checkbox group labelled "Checkbox group" should have the "reverse" variant applied
    And the custom collection date range field labelled "Date range example" should have the "reverse" variant applied

  @mockserver
  Scenario: Alt page - reverse form theme
    Given the page endpoint for path "/custom-collection-alt-theme-reverse" returns fixture "/landingpage/custom-collection/alt-form-theme-reverse" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection-alt-theme-reverse"
    Then the landing page component "TideCustomCollection" should exist
    And I toggle the content collection filters
    Then the custom collection component should have the "light" form theme applied
    Then the custom collection search bar field should have the "default" variant applied
    Then the custom collection checkbox field labelled "Show archived content" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Term filter example" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Terms dependent example" should have the "default" variant applied
    Then the custom collection dropdown field labelled "Terms dependent child example" should have the "default" variant applied
    And the custom collection checkbox group labelled "Checkbox group" should have the "default" variant applied
    And the custom collection date range field labelled "Date range example" should have the "default" variant applied

  @mockserver
  Scenario: Error
    Given the page endpoint for path "/custom-collection" returns fixture "/landingpage/custom-collection" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 400 as alias "cslReq"
    Given I visit the page "/custom-collection"
    Then the landing page component "TideCustomCollection" should exist
    And the custom collection component should display the error "Sorry! Something went wrong. Please try again later."

  @mockserver
  Scenario: No results
    Given the page endpoint for path "/custom-collection" returns fixture "/landingpage/custom-collection" with status 200
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response-no-items" and status 200 as alias "cslReq"
    Given I visit the page "/custom-collection"
    Then the landing page component "TideCustomCollection" should exist
    And the custom collection component should display the error "Sorry, no results match your search. Try again with different search options or check back later."

  @mockserver
  Example: Should hide the search form when hideSearchForm is set
    Given I load the page fixture with "/landingpage/custom-collection/page"
    And the custom collection config has "hideSearchForm" set to "true"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/no-search-form" returns the loaded fixture

    When I visit the page "/no-search-form"
    Then the custom collection component results count should read "Displaying 1-20 of 282 results"
    And the search form should be hidden

  @mockserver
  Example: Should only show filters when showFiltersOnly is set
    Given I load the page fixture with "/landingpage/custom-collection/page"
    And the custom collection config has "showFiltersOnly" set to "true"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/filter-only" returns the loaded fixture

    When I visit the page "/filter-only"
    Then the custom collection component results count should read "Displaying 1-20 of 282 results"
    And only the search filters should be visible

  @mockserver
  Example: Should show filters on load when showFiltersOnLoad is set
    Given I load the page fixture with "/landingpage/custom-collection/form-theme-default"
    And the custom collection config has "showFiltersOnLoad" set to "true"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/filters-on-load" returns the loaded fixture

    When I visit the page "/filters-on-load"
    Then the custom collection filters should be open

    When I toggle the content collection filters
    Then the custom collection filters should not be open

  @mockserver
  Example: Should collapse filters on mobile load when showFiltersOnLoad is set
    Given I am using a "iphone-x" device
    Then I load the page fixture with "/landingpage/custom-collection/form-theme-default"
    And the custom collection config has "showFiltersOnLoad" set to "true"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/filters-on-load" returns the loaded fixture

    When I visit the page "/filters-on-load"
    Then the custom collection filters should not be open

    When I toggle the content collection filters
    Then the custom collection filters should be open

  @mockserver
  Example: Should hide results count when hideResultsCount is set
    Given I load the page fixture with "/landingpage/custom-collection/page"
    And the custom collection results count has been hidden
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/filter-only" returns the loaded fixture

    When I visit the page "/filter-only"
    Then the custom collection component results count should be hidden

  @mockserver
  Example: Autocomplete suggestions are disabled by default
    Given the page endpoint for path "/custom-collection-suggestions" returns fixture "/landingpage/custom-collection/page" with status 200
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200

    When I visit the page "/custom-collection-suggestions"
    Then I type "The" into the custom collection input
    And the search suggestions should not be displayed

  @mockserver
  Example: Autocomplete suggestions can be enabled
    Given I load the page fixture with "/landingpage/custom-collection/page"
    And the search autocomplete request is stubbed with "/landingpage/custom-collection/response-suggestions" fixture
    And the custom collection config has "suggestions.enabled" set to "true"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/custom-collection-suggestions" returns the loaded fixture

    When I visit the page "/custom-collection-suggestions"
    Then I type "gover" into the custom collection input
    Then the search autocomplete request should be called with the "/landingpage/custom-collection/request-suggestions" fixture
    And the search suggestions displayed should include
      | govern            |
      | government        |
      | government agency |

  @mockserver
  Example: Autocomplete minimum characters can be customised
    Given I load the page fixture with "/landingpage/custom-collection/page"
    And the search autocomplete request is stubbed with "/landingpage/custom-collection/response-suggestions" fixture
    And the custom collection config has "suggestions.enabled" set to "true"
    And the custom collection config has "suggestions.minCharacters" set to "5"
    And the search network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200
    Then the page endpoint for path "/custom-collection-suggestions" returns the loaded fixture

    When I visit the page "/custom-collection-suggestions"
    Then I type "gov" into the custom collection input
    Then the search suggestions should not be displayed

    When I type "er" into the custom collection input
    Then the search autocomplete request should be called with the "/landingpage/custom-collection/request-suggestions" fixture
    And the search suggestions displayed should include
      | govern            |
      | government        |
      | government agency |
