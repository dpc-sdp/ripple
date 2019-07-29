Feature: Custom middleware

  Custom middleware should work

  Background:
    Given I visit the page "/demo-landing-page"

  @smoke
  Scenario: Example for adding component
    And the example message is added
