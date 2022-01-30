Feature: Home page

  As a citizen I want to see current relevant links and events.

@focus
  Scenario: On load - desktop
    Given the mock server has started
    And I am using a "macbook-13" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/&site=4" returns fixture "landing-page/homepage" with status 200
    When I visit the page "/"

    # Above content
    Then the page title should be "Department of Trees"
    And the breadcrumbs should not exist
    And the hero banner title should be "How good are trees?"

    # Site Menu
    Then the site header is visible
    And the menu should have 2 top level items
    And the search button in the site header should have the text "Search"

    # Header components
    And the campaign primary banner component should exist
    And the "rpl-campaign-primary" component should contain "How good are trees?"
    And the "rpl-campaign-primary" component should contain "Bloody great they are!"
    And the campaign primary banner image src should be "/sites/default/files/2021-06/Russell%20Street_Melbourne%20Yarra%20River%20and%20Buildings_feature%20edit.jpg"

    # Background color
    And the body background color should be "grey"

    # Body components

    # Card promo
    And the "rpl-card-promo" component should exist
    And there should be the following promotion cards:
      | title                                    | link                                                                                             |
      | Victorian Government grants and programs | https://www.vic.gov.au/grants                                                                    |
      | Prolonged power outage payment           | https://www.vic.gov.au/prolonged-power-outage-payment                                            |
      | Current COVID restrictions               | https://www.coronavirus.vic.gov.au/coronavirus-covidsafe-settings                                |
      | Victoria Together                        | https://www.together.vic.gov.au/                                                                 |
      | Thunderstorm asthma                      | https://www.aboriginalheritagecouncil.vic.gov.au/victorias-current-registered-aboriginal-parties |

    # Card key dates
    And the "rpl-card-keydates" component should exist
    And the "rpl-card-keydates" component should contain "Christmas Day"
    And the "rpl-card-keydates" component should contain "Boxing Day"

    # Markup
    And the "rpl-markup" component should contain "Follow  on Twitter for the latest news and updates."

  Scenario: On load - mobile
    Given the mock server has started
    And I am using a "iphone-8" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/&site=4" returns fixture "landing-page/homepage" with status 200
    When I visit the page "/"
    Then the search button text in the site header should not be visible