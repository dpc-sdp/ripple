Feature: Site theme

  As a site admin I can change the theme colours in the backend and they will populate to the site.

  @mockserver
  Scenario: Default Theme
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(128, 0, 128)"
    And the site footer should have the "default" theme applied

  @mockserver
  Scenario: Alternate Theme
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/theme-red" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(225, 57, 64)"

  @mockserver
  Scenario: Feature flags set neutral theme
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/neutral-footer" with status 200
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site footer should have the "neutral" theme applied


