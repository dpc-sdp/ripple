Feature: Site search

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: Display and manage site search results
    Given the "/api/tide/search/**" network request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"
    When I visit the page "/search?q=demo"
    Then the search listing page should have 5 results
    And the filters toggle should show 0 applied filters
    And the search input should have the value "demo"

    When I toggle the search listing filters section
    And I click the search listing dropdown field labelled "Select a topic"
    Then I click the option labelled "Education" in the selected dropdown
    Then I click the search listing dropdown field labelled "Select a topic"
    And I submit the search filters
    Then the filters toggle should show 1 applied filters
    And the URL should reflect that the current active filters are as follows:
      | id                    | value            |
      | filters[0][field]     | field_topic_name |
      | filters[0][values][0] | Education        |
    And the network request "siteSearchReq" should be called with the "/site/search-request" fixture

    When I clear the search filters
    Then the filters toggle should show 0 applied filters
    And the search input should have the value ""

  @mockserver
  Example: Search bar max input length
    Given the "/api/tide/search/**" network request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"
    When I visit the page "/search"
    Then the search input should be have a max length of 128
