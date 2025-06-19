Feature: Search Queries

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: The search term is displayed after submitting a search with results
    Given the page endpoint for path "/" returns fixture "/search-listing/search-query/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/search-query/response" and status 200

    When I visit the page "/"
    Then I type "Grant" into the search input
    And I click the search button
    Then the search results heading should show "Search results for 'Grant'"

    When I type "Grants" into the search input
    Then the search results heading should show "Search results for 'Grant'"

  @mockserver
  Example: The search term is not displayed after submitting a search with no results
    Given the page endpoint for path "/" returns fixture "/search-listing/search-query/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200

    When I visit the page "/"
    Then I type "Zoo" into the search input
    And I click the search button
    Then the search results heading should not be displayed

  @mockserver
  Example: The search term query can be extended and a custom query config supplied
    Given the page endpoint for path "/" returns fixture "/search-listing/search-query/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/search-query/response" and status 200

    When I visit the page "/"
    And the search network request should be called with the "/search-listing/search-query/request-initial" fixture
    Then the search listing page should have 4 results

    When I type "Demo" into the search input
    And I click the search button
    Then the URL should reflect that the current active filters are as follows:
      | id | value |
      | q  | Demo  |
    And the search network request should be called with the "/search-listing/search-query/request-title-content" fixture

    When I click the search listing dropdown field labelled "Select a search type"
    Then the selected dropdown field should have the items:
      | Title and content |
      | Title             |
      | Content           |
    Then I click the option labelled "Content" in the selected dropdown
    And I click the search button

    Then the URL should reflect that the current active filters are as follows:
      | id                | value   |
      | q                 | Demo    |
      | search[queryType] | content |
    And the search network request should be called with the "/search-listing/search-query/request-content" fixture

    When I toggle the search listing filters section
    And I clear the search filters
    And the search network request should be called with the "/search-listing/search-query/request-initial" fixture

  @mockserver
  Example: Submitting the search bar scrolls to results
    Given the page endpoint for path "/" returns fixture "/search-listing/search-query/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/search-query/response" and status 200

    When I visit the page "/"
    And I type "The" into the search input
    And I click the search button
    Then I should be scrolled to the search results

  @mockserver
  Example: Submitting the search bar does not scroll to results when disabled
    Given I load the page fixture with "/search-listing/search-query/page"
    And the search listing config has "scrollToResultsOnSubmit" set to "false"
    And the search network request is stubbed with fixture "/search-listing/search-query/response" and status 200
    Then the page endpoint for path "/" returns the loaded fixture

    When I visit the page "/"
    And I type "The" into the search input
    And I click the search button
    Then I should not be scrolled to the search results

  @mockserver
  Example: Search bar max input length
    Given the page endpoint for path "/searchbar" returns fixture "/search-listing/list/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/list/response" and status 200

    When I visit the page "/searchbar"
    Then the search input should be have a max length of 128
