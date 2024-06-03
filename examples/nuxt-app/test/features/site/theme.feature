Feature: Site theme

  As a site admin I can change the theme colours in the backend and they will populate to the site.

  @mockserver
  Scenario: Default Theme
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(107, 25, 163)"
    Then the site footer should have the "default" theme applied
    And ripple buttons should have the "default" theme applied
    And the hero banner should have the "default" theme applied
    And the vic.gov.au logo should be displayed
    And the footer vic.gov.au logo should be displayed

  @mockserver
  Scenario: Alternate Theme
    Given the site endpoint returns fixture "/site/theme-red" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site header background color should be "rgb(225, 57, 64)"

  @mockserver
  Scenario: The theme can be set per site section
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I load the page fixture with "/landingpage/home"
    And the site sections primary colour is set to "#1962A3"
    And the page endpoint for path "/section-page" returns the loaded fixture
    When I visit the page "/section-page"
    Then the site header background color should be "rgb(25, 98, 163)"

  @mockserver
  Scenario: Feature flags set neutral theme
    Given the site endpoint returns fixture "/site/neutral-footer" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    Then the site footer should have the "neutral" theme applied
    And ripple buttons should have the "neutral" theme applied
    And the hero banner should have the "neutral" theme applied

  @mockserver
  Scenario: Feature flags can disable vic logo
    Given the site endpoint returns fixture "/site/disable-vic-logo" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    Then the vic.gov.au logo should not be displayed
    And the footer vic.gov.au logo should not be displayed
    And the cobrand logo should be displayed

  @mockserver
  Scenario: Feature flags can disable the global updated date
    Given the site endpoint returns fixture "/site/disable-updated-date" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    Then the last updated date should not be displayed
