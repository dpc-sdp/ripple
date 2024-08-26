Feature: Custom collection map component

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the site endpoint returns fixture "/site/vic" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    Given I am using a "macbook-16" device
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/map-table/vsba/aggregations" and status 200 as alias "aggReq"
    Given the "/test-map-shape-layer" network request is stubbed with fixture "/maps/sample-shapes"
      | method | status |
      | GET    | 200    |
    Given the "https://base.maps.vic.gov.au/service*" network request is stubbed with fixture "/maps/service.png"
      | method | status |
      | GET    | 200    |

  @mockserver
  Scenario: The geolocate button is hidden when not enabled
    Given I load the page fixture with "/maps/basic-page"
    Given the geolocation button is not enabled
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is delayed by 1000 milliseconds and stubbed with fixture "/site/search-response", status 200 and alias "searchReq"
    Given I visit the page "/map"

    Then the geolocate button is hidden

  @mockserver
  Scenario: The geolocate button is shown when enabled
    Given I load the page fixture with "/maps/basic-page"
    Given the geolocation button is enabled
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is delayed by 1000 milliseconds and stubbed with fixture "/site/search-response", status 200 and alias "searchReq"
    Given I visit the page "/map"
    Then the geolocate button is displayed
