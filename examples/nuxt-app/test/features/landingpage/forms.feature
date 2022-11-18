Feature: Forms

  As a user on the site I can view and submit forms wit different input types

  Scenario: Basic form
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/basic-form&site=8888" returns fixture "/landingpage/basic-form" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/basic-form"
    Then the landing page component "RplForm" should exist
    And the form with ID "basic_form" should exist
    And the form "basic_form" should have the following fields:
      | type  | label     | required | help                     |
      | text  | Name      | true     |                          |
      | text  | Last name | false    |                          |
      | email | Email     | false    | Enter your email address |
