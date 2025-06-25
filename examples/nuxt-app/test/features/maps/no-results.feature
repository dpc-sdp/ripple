Feature: No results

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
  Example: Renders no results or empty index component on the map
    Given I load the page fixture with "/maps/basic-page"
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    Given I visit the page "/map"
    And the map is loaded
    And the empty index component should display "There are currently no records to display."

    When I type "bays" into the location search bar
    Then I click the search suggestion labelled "Bayswater North"
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Project Type"
    Then I click the option labelled "Planning" in the selected dropdown
    Then I click the search listing dropdown field labelled "Project Type"
    And I submit the search filters
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I click the clear search button
    Then the custom collection no results component should display "Sorry, no results match your search."

    Then I clear the search filters
    And the empty index component should display "There are currently no records to display."

  @mockserver
  Example: Renders a custom empty index component on the map
    Given I load the page fixture with "/maps/basic-page"
    Then the custom collection results config has "emptyIndex.component" set to "TideSearchEmptyIndexExample"
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    Given I visit the page "/map"
    And the map is loaded
    And the empty index component should display "The index, it's empty!"

  @mockserver
  Example: The empty index component message can be customised on the map
    Given I load the page fixture with "/maps/basic-page"
    Then the custom collection results config has "emptyIndex.component" set to "TideSearchEmptyIndex"
    Then the custom collection results config has "emptyIndex.props.title" set to "There is nothing to see..."
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    When I visit the page "/map"
    And the empty index component should display "There is nothing to see..."

  @mockserver
  Example: Renders no results or empty index component in the map side panel
    Given I load the page fixture with "/maps/basic-page"
    And the side panel is enabled
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    Given I visit the page "/map"
    And the map is loaded
    And the empty index component should display "There are currently no records to display."

    When I type "bays" into the location search bar
    Then I click the search suggestion labelled "Bayswater North"
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Project Type"
    Then I click the option labelled "Planning" in the selected dropdown
    Then I click the search listing dropdown field labelled "Project Type"
    And I submit the search filters
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I click the clear search button
    Then the custom collection no results component should display "Sorry, no results match your search."

    Then I clear the search filters
    And the empty index component should display "There are currently no records to display."

  @mockserver
  Example: Renders a custom empty index component in the map side panel
    Given I load the page fixture with "/maps/basic-page"
    Then the custom collection results config has "emptyIndex.component" set to "TideSearchEmptyIndexExample"
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    Given I visit the page "/map"
    And the map is loaded
    And the empty index component should display "The index, it's empty!"

  @mockserver
  Example: The empty index component message can be customised in the map side panel
    Given I load the page fixture with "/maps/basic-page"
    Then the custom collection results config has "emptyIndex.component" set to "TideSearchEmptyIndex"
    Then the custom collection results config has "emptyIndex.props.title" set to "There is nothing to see..."
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    When I visit the page "/map"
    And the empty index component should display "There is nothing to see..."

  @mockserver
  Example: Renders no results or empty index component in the maps mobile side panel
    Given I am using a "iphone-x" device
    And I load the page fixture with "/maps/basic-page"
    And the side panel is enabled
    And the page endpoint for path "/map" returns the loaded fixture
    And the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" network request is stubbed with fixture "/maps/no-results" and status 200 as alias "searchReq"

    Given I visit the page "/map"
    And the map is loaded
    And the empty index component should display "There are currently no records to display."

    When I type "bays" into the location search bar
    Then I click the search suggestion labelled "Bayswater North"
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Project Type"
    Then I click the option labelled "Planning" in the selected dropdown
    Then I click the search listing dropdown field labelled "Project Type"
    And I submit the search filters
    Then the custom collection no results component should display "Sorry, no results match your search."

    When I click the clear search button
    Then the custom collection no results component should display "Sorry, no results match your search."

    Then I clear the search filters
    And the empty index component should display "There are currently no records to display."
