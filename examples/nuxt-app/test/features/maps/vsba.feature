Feature: School buildings map

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the page endpoint for path "/map" returns fixture "/map-table/vsba/page" with status 200
    Given the site endpoint returns fixture "/site/vsba" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response" and status 200 as alias "searchReq"
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/map-table/vsba/aggregations" and status 200 as alias "aggReq"
    Given the "/api/tide/app-search/vic-postcode-localities/search" network request is stubbed with fixture "/map-table/vsba/localities" and status 200 as alias "localitiesReq"
    Given I visit the page "/map"

  @mockserver
  Scenario: On load
    Then the landing page component "TideCustomCollection" should exist
    Then the custom collection component should have a search input bar
    And the ripple map component should be visible
    And the data map component tabs should exist
    And the data map tabs should be labelled:
      | Map  |
      | List |
    And I wait 2 seconds
    And the map matches the image snapshot "map-on-load"

  @mockserver
  Scenario: Search for postcode
    Then the ripple map component should be visible
    When I enter the term "3012" into the location search input
    Then the location search results should contain "West Footscray"
    When I click the location search term "West Footscray"
    And I wait 2 seconds
    Then the map matches the image snapshot "map-location-search"

  @mockserver
  Scenario: Filters should display when expanded
    When I toggle the search listing filters section
    And I wait 1 seconds
    Then the search listing dropdown field labelled "Filter by" should have the value "Select school type"
    When I click the search listing dropdown field labelled "Filter by"
    Then the selected dropdown field should have the items:
      | Early childhood      |
      | New school           |
      | Non-government grant |

  @mockserver
  Scenario: Click on cluster should zoom in
    When I click the map component at coordinates 535 395
    When I wait 3 seconds
    Then the map matches the image snapshot "map-cluster-zoom"

  @mockserver
  Scenario: Switch to list view
    When I wait 2 seconds
    And I click the tab labelled "List"
    Then the search listing layout should be "table"
    And the custom collection component results count should read "Displaying 1-5 of 2106 results"

