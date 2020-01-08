Feature: Custom fonts should work

  Custom fonts is getting loaded

  Background:
    Given I visit the page "/"

  Scenario: Try using different custom font in theme
    Then Custom fonts is applied
