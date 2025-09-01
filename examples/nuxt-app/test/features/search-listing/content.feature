Feature: Search listing content

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Displays custom content
    Given the page endpoint for path "/search-list-content" returns fixture "/search-listing/content/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/search-list-content"
    Then the search listing should display "This goes before the results" before the results
    Then the search listing should display "This goes after the results" after the results
    And the hero top corner graphic should be "/placeholders/medium.png"
