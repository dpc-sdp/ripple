Feature: Search listing - Suggestions

  As a user I can see a list of suggested autocomplete values

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Displays autocomplete suggestions
    Given the page endpoint for path "/suggestions" returns fixture "/search-listing/suggestions/page-suggestions" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions"
    Then the search listing page should have 2 results

    When I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request" fixture
    And the search suggestions displayed should include
      | the   |
      | there |
      | their |

    When I click the search suggestion labelled "there"
    Then the search input should have the value "there"

  @mockserver
  Example: Autocomplete suggestions search key can be overridden
    Given the page endpoint for path "/suggestions-override" returns fixture "/search-listing/suggestions/page-suggestions-override" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions-override"
    And I type "The" into the search input
    Then the search autocomplete request should be called with the "/search-listing/suggestions/request-override" fixture

  @mockserver
  Example: Autocomplete suggestions can be disabled
    Given the page endpoint for path "/no-suggestions" returns fixture "/search-listing/suggestions/page-no-suggestions" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200

    When I visit the page "/no-suggestions"
    Then the search listing page should have 2 results

    When I type "The" into the search input
    Then the search suggestions should not be displayed

  @mockserver
  Example: Search bar max input length
    Given the page endpoint for path "/suggestions" returns fixture "/search-listing/suggestions/page-suggestions" with status 200
    And the search network request is stubbed with fixture "/search-listing/suggestions/search-response" and status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/response" fixture

    When I visit the page "/suggestions"
    Then the search input should be have a max length of 128
