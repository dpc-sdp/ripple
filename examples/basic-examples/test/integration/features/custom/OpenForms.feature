Feature: OpenForms

  As a Developer I can make sure our custom style for OpenForms is not broken.

  Scenario: The OpenForm style should stay same.
    Given I visit the page "https://digital.vicgov.openforms.com/Form/d9f46289-f2f4-4edf-a4ac-b382259d7e49"
    And ".of-body" image snapshot matches
