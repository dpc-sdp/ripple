Feature: Custom mapping

  Custom mapping should work

  Background:
    Given I visit the page "/"

  Scenario: Example for overriding mapping with custom filter
    And the example filter is applied
  
  Scenario: Example for adding async filter
    And the example async filter is applied

  Scenario: Example for overriding core filter
    And the core filter is overrode
