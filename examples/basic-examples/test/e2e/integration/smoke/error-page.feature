Feature: Custom error page

  Custom error page content should work

  @smoke
  Scenario: Example for adding custom 404 messages
    Given I visit the page "/404"
    And the example 404 error content is added

  Scenario: Example for adding custom 500 messages
    Given I visit the page "/500"
    And the example 500 error content is added
