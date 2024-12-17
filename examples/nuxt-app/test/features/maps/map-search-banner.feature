Feature: Map search banner

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: Map search banner - Content
    Given the page endpoint for path "/search-bar-example" returns fixture "/maps/example-map-search-banner" with status 200
    And I am using a "macbook-16" device
    Then I visit the page "/search-bar-example"
    Then the location search banner should have the following content
      | title               | description            | inputLabel | placeholder      | image                   |
      | Test search heading | Test introduction text | Test label | Test placeholder | /placeholders/mapbg.png |

  @mockserver
  Scenario: Map search banner - Custom suggestions
    Given I load the page fixture with "/maps/example-map-search-banner"
    Given the page endpoint for path "/search-bar-example" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/search-bar-example"
    And I wait 2 seconds
    And I type "bays" into the location search bar
    And I wait 2 seconds
    And the search suggestions displayed should include
      | Test location - testValue - 1 |
      | Test location - testValue - 2 |
      | With magic key                |
    And I click the search suggestion labelled "Test location - testValue - 1"
    Then the current path should be "/test/target/url"
    Then the URL should reflect that the location has the following:
      | key  | value                         |
      | id   | 1                             |
      | name | Test location - testValue - 1 |

  @mockserver
  Scenario: Map search banner - Suggestions with ArcGIS magic keys
    Given the ArcGIS findAddressCandidates endpoint returns "/maps/arcgis-address-candidates" fixture
    Given I load the page fixture with "/maps/example-map-search-banner"
    Given the page endpoint for path "/search-bar-example" returns the loaded fixture
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/simple-map-results" and status 200 as alias "searchReq"
    Given I visit the page "/search-bar-example"
    And I wait 2 seconds
    And I type "bays" into the location search bar
    And I wait 2 seconds
    And the search suggestions displayed should include
      | Test location - testValue - 1 |
      | Test location - testValue - 2 |
      | With magic key                |
    And I click the search suggestion labelled "With magic key"
    Then the current path should be "/test/target/url"
    Then the URL should reflect that the location has the following:
      | key  | value                           |
      | id   | fake1234                        |
      | name | 1234 Fake St Fakeville Vic 3000 |
