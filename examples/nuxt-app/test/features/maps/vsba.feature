Feature: School buildings map

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the page endpoint for path "/map" returns fixture "/map-table/vsba/page" with status 200
    Given the site endpoint returns fixture "/site/vsba" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/map-table/vsba/aggregations" and status 200 as alias "aggReq"


  @mockserver
  Scenario: On load
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And I wait 4 seconds
    Then the landing page component "TideCustomCollection" should exist
    Then the custom collection component should have a search input bar
    And the ripple map component should be visible
    And the data map component tabs should exist
    And the data map tabs should be labelled:
      | Map  |
      | List |
    And I wait 4 seconds
    And the map matches the image snapshot "map-on-load"

  @mockserver
  Scenario: Search for postcode
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    Given the "/api/tide/app-search/vic-postcode-localities/elasticsearch/_search" network request is stubbed with fixture "/map-table/vsba/localities-all" and status 200 as alias "localitiesReq"
    And I visit the page "/map"
    And I wait 4 seconds
    Then the ripple map component should be visible
    When I enter the term "3012" into the location search input
    Then the location search results should contain "West Footscray"
    When I click the location search term "West Footscray"
    And I wait 8 seconds
    Then the map matches the image snapshot "map-location-search"

  @mockserver
  Scenario: Search for locality
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    Given the "/api/tide/app-search/vic-postcode-localities/elasticsearch/_search" network request is stubbed with fixture "/map-table/vsba/localities-all" and status 200 as alias "localitiesReq"
    And I visit the page "/map"
    Then the ripple map component should be visible
    When I enter the term "Maidstone" into the location search input
    Then the location search results should contain "Maidstone"
    When I click the location search term "Maidstone"
    And I wait 8 seconds
    Then the map matches the image snapshot "map-locality-search"

  @mockserver
  Scenario: No results message
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    Given the "/api/tide/app-search/vic-postcode-localities/elasticsearch/_search" network request is stubbed with fixture "/map-table/vsba/localities-nyah" and status 200 as alias "localitiesReq"
    And I visit the page "/map"
    Then the ripple map component should be visible
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-none" and status 200 as alias "searchReq"
    When I enter the term "nyah" into the location search input
    Then the location search results should contain "Nyah"
    When I click the location search term "Nyah"
    And I wait 2 seconds
    Then the map no results message should be visible
    Then the map no results message should contain "Sorry, no results match your search. Try again with different search options or check back later. "
    And I wait 8 seconds
    Then the map matches the image snapshot "map-no-results"

  @mockserver
  Scenario: Filters should display when expanded
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And I wait 4 seconds
    When I toggle the search listing filters section
    And I wait 5 seconds
    Then the search listing dropdown field labelled "Project Type" should have the value "Select"
    When I click the search listing dropdown field labelled "Project Type"
    Then the selected dropdown field should have the items:
      | New school           |
      | School upgrade       |
      | Planning             |
      | Early childhood      |
      | Tech school          |
      | Non-government grant |

  @mockserver
  Scenario: Click on cluster should zoom in
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    And I visit the page "/map"
    When I wait 4 seconds
    When I click the map component at coordinates 650 429
    When I wait 8 seconds
    Then the map matches the image snapshot "map-cluster-zoom"

  @mockserver
  Scenario: Switch to list view
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response-all" and status 200 as alias "searchReq"
    And I visit the page "/map"
    When I wait 5 seconds
    And I click the tab labelled "List"
    Then the search listing layout should be "table"
    And the custom collection component results count should read "Displaying 1-5 of 2159 results"
