Feature: Site search
  Background:
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" aggregation request is stubbed with fixture "/site/search-aggregations" and status 200 as alias "aggReq"
    Given the "/api/tide/elasticsearch/elasticsearch_index_develop_node/_search" search request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"

  @mockserver
  Example: Display and manage site search results
    Given the site endpoint returns fixture "/site/reference" with status 200

    When I visit the page "/search?q=demo"

    And the dataLayer should include the following events
      | event       | page_title | search_term |
      | routeChange | Search     | demo        |

    When I wait 500 milliseconds
    Then the search listing page should have 5 results
    And the filters toggle should show 0 applied filters
    And the search input should have the value "demo"
    Then the search results heading should show "Search results for 'demo'"
    And the search listing results count should read "Displaying 1-5 of 5 results"
    And the search listing results should have following items:
      | title           | content                                                                                       | url              | component         |
      | TAFE teacher    | Find out more about working as a TAFE teacher and the possible pathways to job opportunities. | /tafe-teacher    | rpl-search-result |
      | TAFE governance | Victoria’s TAFEs are established under the Education and Training Reform Act 2006.            | /tafe-governance | rpl-search-result |

    When I toggle the search listing filters section
    And I click the search listing dropdown field labelled "Select a topic"
    Then I click the option labelled "Education" in the selected dropdown
    Then I click the search listing dropdown field labelled "Select a topic"
    And I submit the search filters
    Then the filters toggle should show 1 applied filters
    And the URL should reflect that the current active filters are as follows:
      | id    | value     |
      | topic | Education |
    And the network request "siteSearchReq" should be called with the "/site/search-request" fixture

    When I type "the" into the search input
    Then the search results heading should show "Search results for 'demo'"

    When I clear the search filters
    Then the filters toggle should show 0 applied filters
    And the search input should have the value ""
    And the search results heading should not be displayed

  @mockserver
  Example: Overrides site search content types with feature flag
    Then I load the site fixture with "/site/reference"
    And the feature flag "search.contentTypes.grant" is set to "false"
    And the feature flag "search.contentTypes.product" is set to "true"
    And the site endpoint returns the loaded fixture

    When I visit the page "/search?q=demo"
    Then I toggle the search listing filters section
    And I clear the search filters
    Then the network request "siteSearchReq" should be called with the "/site/search-request-content-types" fixture

  @mockserver
  Example: Search bar max input length
    Given the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/search"
    Then the search input should be have a max length of 128
    And the search results heading should not be displayed

  @mockserver
  Example: View search results analytics event
    Given the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/search?q=testQuery123&topic=Governance"
    And the dataLayer should include the following events
      | event               | name   | component   | platform_event | index | filters          | label        |
      | view_search_results | Search | tide-search | search         | 1     | topic=Governance | testQuery123 |


