Feature: Vicpol map

  I want to display a map that meets the needs of the Victorian police

  Background:
    Given the site endpoint returns fixture "/site/vicpol" with status 200

  @mockserver
  Scenario: Custom tabs
    Given I am using a "macbook-16" device
    Given the page endpoint for path "/police-station-location" returns fixture "/map-table/vicpol/page" with status 200
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vicpol/response" and status 200 as alias "searchReq"
    Given I visit the page "/police-station-location"
    Then the landing page component "TideCustomCollection" should exist
    And the data map tabs should be labelled:
      | Listy  |
      | Mappy  |
      | Videos |
    When I click the tab labelled "Mappy"
    Then the ripple map component should be visible

  @mockserver
  Scenario: Search for location i.e. name
    Given the page endpoint for path "/police-station-location" returns fixture "/map-table/vicpol/page" with status 200
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vicpol/response" and status 200 as alias "searchReq"
    Given the "/api/tide/elasticsearch/sdp_data_pipelines_sdp_localities_data/_search" network request is stubbed with fixture "/map-table/vicpol/locations-brunswick" and status 200 as alias "locationsReq"
    Given I visit the page "/police-station-location"
    When I enter the term "Brunswick" into the location search input
    Then the location search results should contain "Brunswick"
    And the location search results should contain "Brunswick East"
    When I click the location search term "Brunswick East"
    Then the location search value should be "Brunswick East"
