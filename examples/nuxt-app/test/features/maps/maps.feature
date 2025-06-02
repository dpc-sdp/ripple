Feature: Custom collection map component

  I want to display a map of features from an indexed data pipeline

  Background:
    Given the site endpoint returns fixture "/site/vic" with status 200
    And the location autocomplete request is stubbed with "/maps/example-suburbs-response" fixture
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
    Then the dataLayer should include the following events
      | event          | name           | label           | mode | component |
      | map_popup_open | Test map title | Single Pin Test | pin  | rpl-map   |
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
    Then the dataLayer should include the following events
      | event          | name           | mode    | component |
      | map_popup_open | Test map title | cluster | rpl-map   |
    Then the dataLayer event for "map_popup_open" should include the following "label"
      | value                       |
      | Double Pin Test - Point One |
      | Double Pin Test - Point Two |
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
    Then the dataLayer should include the following events
      | event          | name           | label           | mode      | component |
      | map_popup_open | Test map title | Single Pin Test | sidepanel | rpl-map   |
    Then the map matches the image snapshot "map-sidepanel-item-click"

  @mockserver
  Scenario: Single active feature is split out from clustered features
    Given I load the page fixture with "/maps/basic-page"
    Given the side panel is enabled
    And the clustering distance is set to "400"
    Given the popup type is "sidebar"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map"
    And the map is loaded
    Given I click the side panel item with text "Single Pin Test"
    When I wait 4 seconds
    Then the map matches the image snapshot "map-popup-type-sidebar-with-sidepanel-double-pin-single-active"

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
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is delayed by 500 milliseconds and stubbed with fixture "/maps/simple-map-results", status 200 and alias "searchReq"
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

  @mockserver
  Scenario: Updating the filters will revert the map position
    Given I load the page fixture with "/maps/basic-page"
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Then the page endpoint for path "/map" returns the loaded fixture
    And I visit the page "/map"
    Then I wait 3 seconds

    When I click the zoom in button
    Then I wait 4 seconds
    Then the map matches the image snapshot "map-position-zoom-in"

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Project Type"
    And I click the option labelled "Planning" in the selected dropdown
    And I click the search listing dropdown field labelled "Project Type"
    Then I submit the search filters
    And I wait 3 seconds
    Then the map matches the image snapshot "map-position-filtered"

    When I click the zoom out button
    Then I wait 4 seconds
    Then the map matches the image snapshot "map-position-filtered-zoom-out"

    When I clear the search filters
    And I wait 3 seconds
    Then the map matches the image snapshot "map-position-cleared"

  @mockserver
  Scenario: Applying filters with location only will revert the map position to the location
    Given I load the page fixture with "/maps/basic-page"
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Then the page endpoint for path "/map" returns the loaded fixture
    When I visit the page "/map?location[id]=doc-661493669bd65fde1ab9b791&location[name]=Bayswater+North&location[postcode]=3153&location[bbox]=145.25846667091363&location[bbox]=-37.83800461846399&location[bbox]=145.30593610877344&location[bbox]=-37.813258938042594&location[center]=145.2836623&location[center]=-37.8268821"
    Then I wait 3 seconds

    When I click the zoom out button
    Then I click the zoom out button
    And I wait 4 seconds
    Then the map matches the image snapshot "map-position-location-zoom-out"

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Project Type"
    And I click the option labelled "Planning" in the selected dropdown
    And I click the search listing dropdown field labelled "Project Type"
    Then I submit the search filters
    And I wait 3 seconds
    Then the map matches the image snapshot "map-position-location-filtered"

    When I clear the search filters
    And I wait 3 seconds
    Then the map matches the image snapshot "map-position-location-cleared"

  @mockserver
  Scenario: Clicking a result link fires the click_search_result event
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map?location[name]=testQuery123&activeTab=listing&page=3&category=Planning"
    Then the list view should be displayed
    When I click the link in the list view with label "Blue Pin"
    Then the dataLayer should include the following events
      | event               | name           | mode    | component         | platform_event | index | count | element_text | element_id     | link_url             | filters           | label        |
      | click_search_result | Test map title | listing | rpl-search-result | navigate       | 3     | 2159  | Blue Pin     | test-map-title | /site-622/aaa-school | category=Planning | testQuery123 |

  @mockserver
  Scenario: Viewing results fires the view_search_results event
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map?location[name]=testQuery123&activeTab=listing&page=3&category=Planning"
    Then the list view should be displayed
    And the dataLayer should include the following events
      | event               | name           | mode    | component              | platform_event | index | count | element_id     | filters           | label        |
      | view_search_results | Test map title | listing | tide-custom-collection | search         | 3     | 2159  | test-map-title | category=Planning | testQuery123 |

  @mockserver
  Scenario: Switching tabs fires the select_tab event
    Given I load the page fixture with "/maps/basic-page"
    Given the popup type is "popover"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    And I visit the page "/map?location[name]=testQuery123&activeTab=map&page=3&category=Planning"
    And the map is loaded
    And I click the tab labelled "List"
    Then the list view should be displayed
    And the dataLayer should include the following events
      | event      | name           | component | platform_event | element_id | element_text |
      | select_tab | Test map title | rpl-tabs  | toggleTab      | listing    | List         |
