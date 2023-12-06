Feature: School buildings map

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the page endpoint for path "/map" returns fixture "/map-table/vsba/page" with status 200
    Given the site endpoint returns fixture "/site/vsba" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/map-table/vsba/response" and status 200 as alias "searchReq"
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/map-table/vsba/aggregations" and status 200 as alias "aggReq"
    Given the "/api/tide/app-search/vic-postcode-localities/_search" network request is stubbed with fixture "/map-table/vsba/localities" and status 200 as alias "localitiesReq"
    Given I visit the page "/map"

  @mockserver
  Scenario: On load
    Then the landing page component "TideDataDrivenMap" should exist
    Then the custom collection component should have a search input bar
    And the ripple map component should be visible
    And the data map component tabs should exist
    And the data map tabs should be labelled:
      | Map  |
      | List |

  @mockserver
  Scenario: Switch to list view
    When I click the tab labelled "List"
    Then the search listing layout should be "table"
    And the custom collection component results count should read "Displaying 1-5 of 2106 results"

