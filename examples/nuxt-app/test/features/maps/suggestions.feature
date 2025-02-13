Feature: Suggestions

  I want to be able to customise the suggestions for location search

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
    Given the ArcGIS findAddressCandidates endpoint returns "/maps/arcgis-address-candidates" fixture

  @mockserver
  Scenario: Default
    Given I load the page fixture with "/maps/basic-page"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"

    When I visit the page "/map?activeTab=listing"
    And I wait 2 seconds
    And I type "bays" into the location search bar
    And the search suggestions displayed should include
      | Bayswater North |
      | Bayswater       |

    When I click the search suggestion labelled "Bayswater North"
    Then the search input should display the text "Bayswater North"
    And the URL should reflect that the location has the following:
      | key  | value           |
      | name | Bayswater North |

  @mockserver
  Scenario: Suggestion is auto selected on enter
    Given I load the page fixture with "/maps/basic-page"
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map?activeTab=listing"
    And I wait 2 seconds
    Then the search submit button should not be displayed

    When I type "bays" into the location search bar
    And the search suggestions displayed should include
      | Bayswater North |
    When I type "{enter}" into the location search bar
    Then the search input should display the text "Bayswater North"
    And the search input should display the tag "3153"
    And the URL should reflect that the location has the following:
      | key      | value                        |
      | id       | doc-661493669bd65fde1ab9b791 |
      | name     | Bayswater North              |
      | postcode | 3153                         |

    When I click the clear search button
    Then the search input should have the value ''
    And the URL should reflect that the location has the following:
      | key      | value |
      | id       |       |
      | name     |       |
      | postcode |       |

  @mockserver
  Scenario: Custom suggestions function
    Given I load the page fixture with "/maps/basic-page"
    And a custom suggestions function called "exampleSuggestionsFn" is used
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map?activeTab=listing"
    And I wait 2 seconds
    And I type "bays" into the location search bar
    And the search suggestions displayed should include
      | Test location - testValue - 1 |
      | Test location - testValue - 2 |
      | With magic key                |
    And I wait 2 seconds
    And I click the search suggestion labelled "Test location - testValue - 1"
    Then the URL should reflect that the location has the following:
      | key  | value                         |
      | id   | 1                             |
      | name | Test location - testValue - 1 |

  @mockserver
  Scenario: Custom suggestions function with ArcGIS magic keys
    Given I load the page fixture with "/maps/basic-page"
    And a custom suggestions function called "exampleSuggestionsFn" is used
    Given the page endpoint for path "/map" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/map?activeTab=listing"
    And I wait 2 seconds
    And I type "bays" into the location search bar
    And the search suggestions displayed should include
      | Test location - testValue - 1 |
      | Test location - testValue - 2 |
      | With magic key                |
    And I wait 2 seconds
    And I click the search suggestion labelled "With magic key"
    Then the URL should reflect that the location has the following:
      | key  | value                           |
      | id   | fake1234                        |
      | name | 1234 Fake St Fakeville Vic 3000 |
