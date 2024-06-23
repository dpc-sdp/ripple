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
  Scenario: A loading screen is shown while the map loads
    Given I load the page fixture with "/maps/basic-page"
    And the page endpoint for path "/map" returns fixture "/maps/basic-page" with status 200
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is delayed by 500 milliseconds and stubbed with fixture "/site/search-response", status 200 and alias "searchReq"
    Given I visit the page "/map"
    Then the map loading screen should be displayed
    When I wait 500 milliseconds
    Then the map should be displayed

  @mockserver
  Scenario: Popup - 'popover' type
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    When I wait 2 seconds
    When I click the map component at coordinates 517 242
    When I wait 2 seconds
    Then the map matches the image snapshot "map-popup-type-popover"

  @mockserver
  Scenario: Popup - 'sidebar' type
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    When I wait 2 seconds
    When I click the map component at coordinates 517 242
    When I wait 2 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar"

  @mockserver
  Scenario: Popup - 'popover' type with sidepanel
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the side panel is enabled
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    When I wait 2 seconds
    When I click the map component at coordinates 663 242
    When I wait 2 seconds
    Then the map matches the image snapshot "map-popup-type-popover-with-sidepanel"

  @mockserver
  Scenario: Popup - 'sidebar' type with sidepanel
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the side panel is enabled
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    When I wait 2 seconds
    When I click the map component at coordinates 663 242
    When I wait 2 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar-with-sidepanel"

  @mockserver
  Scenario: Popup - Two pins in same location
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    When I wait 2 seconds
    When I click the map component at coordinates 606 424
    When I wait 2 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar-with-sidepanel-double-pin"

  @mockserver
  Scenario: Sidepanel - Clicking an item
    Given I load the page fixture with "/maps/basic-page"
    Given the side panel is enabled
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    Given I click the side panel item with text "Single Pin Test"
    When I wait 2 seconds
    Then the map matches the image snapshot "map-sidepanel-item-click"
