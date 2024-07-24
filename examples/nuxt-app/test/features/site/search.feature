Feature: Site search

  @mockserver
  Example: Display and manage site search results
    Given the site endpoint returns fixture "/site/reference" with status 200
    Given the "/api/tide/search/**" network request is delayed by 500 milliseconds and stubbed with fixture "/site/search-response", status 200 and alias "siteSearchReq"
    When I visit the page "/search?q=demo"
    Then the search listing skeleton should display 10 items with the class "tide-search-result-skeleton"

    When I wait 500 milliseconds
    Then the search listing page should have 5 results
    And the filters toggle should show 0 applied filters
    And the search input should have the value "demo"
    And the search listing results count should read "Displaying 1-5 of 5 results"
    And the search listing results should have following items:
      | title                                                 | content                                                                                                                  | url                                                      | component         |
      | TAFE and training providers in Melbourne’s south-east | Explore local TAFE and training providers across Melbourne’s south-eastern region                                        | /tafes-training-providers-melbourne-south-eastern-region | rpl-search-result |
      | Time for a career change?                             | With TAFE, it's now easier than ever to learn new skills for your chosen career or retrain to get the job of your dreams | /career-change                                           | rpl-search-result |

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
  Example: Overrides site search content types with feature flag
    Given the "/api/tide/search/**" network request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"
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
    Given the "/api/tide/search/**" network request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"
    When I visit the page "/search"
    Then the search input should be have a max length of 128
