Feature: Site theme

  As a site admin I can change the theme colours in the backend and they will populate to the site.

  @mockserverwithproxy
  Scenario: Default Theme
    Given the mock server has started with proxy
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(128, 0, 128)"

  @mockserver
  Scenario: Red Theme
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/theme-red" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(225, 57, 64)"
  # And the callout background color should be "pink"
  # And the callout border color should be "a darker shade of pink"

  @mockserver
  Scenario: Blue Theme
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/theme-blue" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(28, 79, 156)"
# And the callout background color should be "blue"
# And the callout border color should be "a darker shade of blue"


