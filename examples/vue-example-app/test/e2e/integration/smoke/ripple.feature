Feature: Custom theme should work

  Custom theme is getting loaded

  Background:
    Given I visit the Vue router path "/"
  @smoke
  Scenario: Use some Ripple example components
    And the example ripple components should exist
