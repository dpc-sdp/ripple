Feature: Forms

  As a user on the site I can view and submit forms wit different input types

  @mockserver
  Scenario: Kitchen sink
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist
    Then a "text" input with the label "First name" should exist
      | help                  | required |
      | Enter your given name | true     |
    Then a "text" input with the label "Last name" should exist
    Then a "email" input with the label "Email" should exist
    Then a "number" input with the label "Quantity" should exist
    Then a "url" input with the label "Website" should exist
    Then a "tel" input with the label "Mobile phone" should exist
    Then a "date" input with the label "Date of birth" should exist
    Then a select field with the label "Favourite colour" should exist
      | required |
      | true     |
    Then a select field with the label "Term select" should exist
    Then a radio group field with the label "Type of person" should exist with the following options
      | label       |
      | Dog person  |
      | Cat person  |
      | Bird person |
    Then a checkbox field with the label "Terms and conditions" should exist
      | checkboxLabel      | help                    | required |
      | I accept the terms | Please accept the terms | true     |
    Then a checkbox group field with the label "Favourite Locations" should exist with the following options
      | label     |
      | Melbourne |
      | London    |
      | Tokyo     |
    Then a textarea field with the label "Message" should exist
      | help               | required |
      | Enter your message | true     |

  @mockserver
  Scenario: Error summary
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist

    Then the error summary should not display
    When I submit the form with ID "full_form"
    Then the error summary should display with the following errors
      | text                           | url                              |
      | You must enter your first name | /kitchen-sink#first_name         |
      | The message field is required  | /kitchen-sink#message            |
      | Must choose a favourite colour | /kitchen-sink#favourite_colour   |
      | You must accept the terms      | /kitchen-sink#i_accept_the_terms |
    Then clicking on an error summary link with text "Must choose a favourite colour" should focus on the input with ID "favourite_colour"

  @mockserver
  Scenario: Simple validation
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist

    Then the input with the label "First name" should be valid
    When I submit the form with ID "full_form"
    Then the input with the label "First name" should be invalid with message "You must enter your first name"
    When I type "Cat" into the input with the label "First name"
    Then the input with the label "First name" should be invalid with message "You must enter your first name"

    When I submit the form with ID "full_form"
    Then the input with the label "First name" should be valid

  @mockserver
  Scenario: Form submission - Error
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    And posting form to endpoint "/api/tide/webform_submission/full_form" returns fixture "/landingpage/full-form-error-response" with status 500
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist

    When I type "Cat" into the input with the label "First name"
    And I type "Here is some text to go in the textarea field" into the textarea with the label "Message"
    And I click "Green" from the select field with label "Favourite colour"
    And I toggle the checkbox with label "Terms and conditions"

    When I submit the form with ID "full_form"

    Then a server message should be displayed above the form
      | status | title        | description        |
      | error  | Server error | Test error message |

  @mockserver
  Scenario: Form submission - Success
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    And posting form to endpoint "/api/tide/webform_submission/full_form" returns fixture "/landingpage/full-form-success-response" with status 201
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist

    When I type "Cat" into the input with the label "First name"
    And I type "Dog" into the input with the label "Last name"
    And I type "catdog@test.com" into the input with the label "Email"
    And I type "25" into the input with the label "Quantity"
    And I type "www.catdog.com" into the input with the label "Website"
    And I type "0400 000 000" into the input with the label "Mobile phone"
    And I type "Here is some text to go in the textarea field" into the textarea with the label "Message"
    And I click "Green" from the select field with label "Favourite colour"
    And I click "Free admission" from the select field with label "Term select"
    And I click "Seniors" from the select field with label "Term select"
    And I toggle the checkbox with label "Terms and conditions"

    And I submit the form with ID "full_form"

    Then a server message should be displayed above the form
      | status  | title          | description          |
      | success | Server success | Test success message |
