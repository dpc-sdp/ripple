Feature: Custom theme should work

  Custom theme is getting loaded

  Background:
    Given I visit the page "/"

  Scenario: Custom colour is applied
    And the site header has custom background color
  
  Scenario: Custom scss is applied
    And the hero banner has text attached after
