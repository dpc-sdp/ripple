Feature: Site search

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the "/api/tide/search/**" network request is stubbed with fixture "/site/search-response" and status 200 as alias "siteSearchReq"

  @mockserver
  Example: Display and manage site search results
    When I visit the page "/search?q=demo"
    Then the search listing page should have 5 results
    And the filters toggle should show 0 applied filters
    And the search input should have the value "demo"
    And the search listing results count should read "Displaying 1-4 of 4 results"
    And the search listing results should have following items:
      | title                                                 | content                                                                                                                  | url                                                      |
      | TAFE and training providers in Melbourne’s south-east | Explore local TAFE and training providers across Melbourne’s south-eastern region                                        | /tafes-training-providers-melbourne-south-eastern-region |
      | Time for a career change?                             | With TAFE, it's now easier than ever to learn new skills for your chosen career or retrain to get the job of your dreams | /career-change                                           |

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
  Example: Submitting the search form scrolls to results
    When I visit the page "/search"
    And I type "The" into the search input
    And I click the search button
    And I wait 500 milliseconds
    Then I should be scrolled to the search results
