Feature: Custom css should work

  Custom css is getting loaded

  Background:
    Given I visit the page "/demo-landing-page"

  @smoke
  Scenario: Custom css for example message is applied
    And the example message has custom background color
