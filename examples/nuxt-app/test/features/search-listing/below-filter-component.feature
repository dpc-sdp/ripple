Feature: Below filter component

  Render a custom component below filters, but above results

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Empty response with custom component
    Given the page endpoint for path "/search-list-custom" returns fixture "/search-listing/below-filter-component/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/search-list-custom"
    Then the search listing page should have 0 results
    And a custom component should be rendered below the filter
