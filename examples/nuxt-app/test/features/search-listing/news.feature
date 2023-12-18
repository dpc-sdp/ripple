Feature: News collection

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: Results formatting
    Given the page endpoint for path "/news" returns fixture "/search-listing/news/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/news/response" and status 200
    When I visit the page "/news"
    Then the search listing page should have 9 results
    And the search listing layout should be "grid"
