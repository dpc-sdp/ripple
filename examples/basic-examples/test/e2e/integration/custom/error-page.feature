Feature: Custom error page

  Custom error page content should work

  Scenario: Example for adding custom 404 messages
    Given I attempt to visit the page "/404"
    Then the example 404 error content is added

  Scenario: Example for adding custom 500 messages
    Given I attempt to visit the page "/500"
    Then the example 500 error content is added
