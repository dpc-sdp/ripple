Feature: Forms, extended

  As a developer, I can add custom form inputs that are not provided in the core offering

  Background:
    Given the mock server has started
    And the page endpoint for path "/webform" returns fixture "../../layers/ripple-ui-forms-ext/__test__/fixtures/webform" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: Custom input
    Given I visit the page "/webform"
    Then the landing page component "TideLandingPageWebForm" should exist
    And a field labelled "Extended" should exist with the CSS class ".rpl-form__input--type-item"

  @mockserver
  Scenario: Unsupported input
    Given I visit the page "/webform"
    Then the landing page component "TideLandingPageWebForm" should exist
    And an input of type "signature" is not yet supported
