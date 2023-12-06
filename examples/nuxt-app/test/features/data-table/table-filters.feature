Feature: Custom Collection

  As an editor I want to be able to add a view of results in a search index to a landing page with filters

  Background:
    Given the page endpoint for path "/" returns fixture "/map-table/ise/page" with status 200
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device

  @mockserver @focus
  Scenario: On load
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_scl/_search" network request is stubbed with fixture "/landingpage/custom-collection/response" and status 200 as alias "cslReq"
    Given I visit the page "/"
    Then the landing page component "TideCustomCollection" should exist
    And the custom collection component should have a search input bar
    And the custom collection component results count should read "Displaying 1-10 of 282 results"
    And the "cslReq" network request should be made to the elasticsearch endpoint
    And the search listing layout should be "table"
