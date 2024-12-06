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
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is delayed by 1000 milliseconds and stubbed with fixture "/site/search-response", status 200 and alias "searchReq"
    Given I visit the page "/map"
    Then the map loading screen should be displayed
    And the map is loaded
    Then the map should be displayed

  @mockserver
  Scenario: Popup - 'popover' type
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I click the map component at coordinates 517 242
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-popover"

  @mockserver
  Scenario: Popup - 'sidebar' type
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I click the map component at coordinates 517 242
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar"

  @mockserver
  Scenario: Popup - 'popover' type with sidepanel
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the side panel is enabled
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I click the map component at coordinates 663 242
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-popover-with-sidepanel"

  @mockserver
  Scenario: Popup - 'sidebar' type with sidepanel
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the side panel is enabled
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I click the map component at coordinates 663 242
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar-with-sidepanel"

  @mockserver
  Scenario: Popup - Two pins in same location
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I click the map component at coordinates 606 442
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar-with-sidepanel-double-pin"

  @mockserver
  Scenario: Sidepanel - Clicking an item
    Given I load the page fixture with "/maps/basic-page"
    Given the side panel is enabled
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    Given I click the side panel item with text "Single Pin Test"
    When I wait 4 seconds
    Then the map matches the image snapshot "map-sidepanel-item-click"

  @mockserver
  Scenario: Reaching the maximum zoom level will show clustered features in grouped popup
    Given I load the page fixture with "/maps/basic-page"
    And the popup type is "popover"
    And the maximum zoom level is set to "7"
    And the clustering distance is set to "300"
    Then the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    Then I click the map component at coordinates 545 385
    And I wait 1 seconds
    Then I click the map component at coordinates 650 320
    And I wait 4 seconds
    Then the map matches the image snapshot "map-popover-max-zoom-cluster"

  @mockserver
  Scenario: Map zooms to intended initial location with results hook
    Given I load the page fixture with "/maps/basic-page"
    And a custom map results hook called "exampleMapResultsHook" is used
    Then the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    When I wait 4 seconds
    Then the map matches the image snapshot "map-initial-location-results-hook"

  @mockserver
  Scenario: Map zooms to intended custom default extent
    Given I load the page fixture with "/maps/basic-page"
    And the following default extent is used
      | minx               | miny              | maxx               | maxy               |
      | 15981434.752845502 | -4584261.14712816 | 16186285.988645602 | -4381244.400003005 |
    Then the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    Then the map matches the image snapshot "map-custom-default-extent"

  @mockserver
  Scenario: Map can be viewed fullscreen
    Given I load the page fixture with "/maps/basic-page"
    And the page endpoint for path "/map" returns the loaded fixture
    And I visit the page "/map"
    When I click the view fullscreen button
    And I wait 100 milliseconds
    Then the map should be fullscreen
    When I click the exit fullscreen button
    And I wait 100 milliseconds
    Then the map should not be fullscreen

  @mockserver
  Scenario: Map height can be customised
    Given I load the page fixture with "/maps/basic-page"
    And the map height is set to 606
    Then the page endpoint for path "/map" returns the loaded fixture
    When I visit the page "/map"
    Then the map height is 606
