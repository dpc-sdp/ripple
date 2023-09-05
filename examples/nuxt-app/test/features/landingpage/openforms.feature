Feature: Openforms

  As a citizens I can submit forms that contain sensitive data to Openforms

  Background:
    Given the page endpoint for path "/" returns fixture "/landingpage/openforms" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/"

  @mockserver
  Scenario: Renders form
    Given I visit the page "/"
    Then there is an openforms embed with the url "https://au.openforms.com/Form/3e7396c7-dbaf-4276-be99-833d9b64c701"
    And the openforms iframe height is at least 1890
