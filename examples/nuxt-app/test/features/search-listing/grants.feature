Feature: Collection pages

  As a site I can see a collection of links to other pages and interact with it find the one I want.

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Grants
    Given posting to endpoint "/api/tide/search/a83890f7a31dea14e1ae83c6f0afacca-appsearch-index-default-node/elasticsearch/_search" returns fixture "/search-listing/elastic/grants" with status 200
    Given the endpoint "/api/tide/page" with query "?path=/grants&site=8888" returns fixture "/search-listing/grants" with status 200
    When I visit the page "/grants"
    Then the search listing page should have 2 results
