Feature: Forms

  As a user on the site I can view and submit forms wit different input types

  Background:
    Given the endpoint "/api/tide/page" with query "?path=/basic-form&site=8888" returns fixture "/landingpage/basic-form" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Then I visit the page "/basic-form"

  @mockserver
  Scenario: Basic form
    Given the landing page component "RplForm" should exist
    Then the form with ID "basic_form" should exist
    And the form "basic_form" should have the following fields:
      | type     | label     | required | help                     |
      | text     | Name      | true     |                          |
      | text     | Last name | false    |                          |
      | email    | Email     | false    | Enter your email address |
      | textarea | Message   | true     | Enter your message       |

  @mockserver
  Scenario: Field counter
    Given the form with ID "basic_form" should exist
    Then 0 characters in the field "message" on "basic_form" should display a counter of "You have 10 characters remaining"
    Then 5 characters in the field "message" on "basic_form" should display a counter of "You have 5 characters remaining"
    Then 9 characters in the field "message" on "basic_form" should display a counter of "You have 1 character remaining"
    Then 10 characters in the field "message" on "basic_form" should display a counter of "You have 10 characters"
    Then 50 characters in the field "message" on "basic_form" should display a counter of "You have 50 characters"
    Then 51 characters in the field "message" on "basic_form" should display a counter of "You have 1 character too many"
    Then 55 characters in the field "message" on "basic_form" should display a counter of "You have 5 characters too many"
