Feature: Search listing table layout

  I can see a collection of results displayed in a tabular form

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture

  @mockserver
  Example: Grants
    Given the page endpoint for path "/search-listing-table" returns fixture "/search-listing/table/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    Then the table should not display extra content

  @mockserver
  Example: Table shows extra content using a custom component
    Given the page endpoint for path "/search-listing-table-extra-components" returns fixture "/search-listing/table/page-extra-component" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table-extra-components"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    And the table should have the caption "My Table"
    And the table should have the footer "Some notes about the table"
    When I toggle the tables extra content row
    Then the tables extra content should contain the text "Details: 1 Implemented"

  @mockserver
  Example: Table shows extra structured content using object keys
    Given the page endpoint for path "/search-listing-table-structured" returns fixture "/search-listing/table/page-extra-structured" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table-structured"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    When I toggle the tables extra content row
    Then the tables extra content should contain the text "Review and begin implementing the Common Risk Assessment Framework"
