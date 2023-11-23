Feature: School buildings map

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the page endpoint for path "/map" returns fixture "/landingpage/maps/vsba/page" with status 200
    Given the site endpoint returns fixture "/site/vsba" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device

  @mockserver
  Scenario: On load
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/landingpage/maps/vsba/response" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    Then the landing page component "TideCustomCollection" should exist
    And the custom collection component should have a search input bar
    And the custom collection component results count should read "Displaying 1-10 of 2105 results"
    And the "searchReq" network request should be made to the elasticsearch endpoint
    And the search listing layout should be "table"
