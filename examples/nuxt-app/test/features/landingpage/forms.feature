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
    Then a select field with the label "Searchable single select" should exist
    Then a select field with the label "Searchable multi select" should exist
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
    Then a hidden field named "site_section" should exist with the value "DPC"
    And the following field attributes should exist
      | field     | attribute    | value |
      | Last name | autocomplete | on    |
      | Role      | autocomplete | off   |
      | Email     | autocomplete | email |

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
      | text                                     | url                       |
      | You must enter your first name           | #first_name               |
      | The message field is required            | #message                  |
      | Must choose a favourite colour           | #favourite_colour         |
      | The searchable single select is required | #searchable_single_select |
      | You must accept the terms                | #i_accept_the_terms       |
    Then clicking on an error summary link with text "Must choose a favourite colour" should focus on the input with ID "favourite_colour"

    And the dataLayer should include the following events
      | event       | form_id   | form_valid | element_text | component |
      | form_submit | full_form | false      | Submit       | rpl-form  |

  @mockserver
  Scenario: Simple validation
    Given the mock server has started
    And the page endpoint for path "/kitchen-sink" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/kitchen-sink"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "full_form" should exist

    Then the input with the label "First name" should be valid
    And the select with the label "Searchable single select" should be valid
    When I submit the form with ID "full_form"
    Then the input with the label "First name" should be invalid with message "You must enter your first name"
    And the select with the label "Searchable single select" should be invalid with message "The searchable single select is required"
    When I type "Cat" into the input with the label "First name"
    And I select "Orange" by searching the select field with label "Searchable single select"

    When I submit the form with ID "full_form"
    Then the input with the label "First name" should be valid
    Then the select with the label "Searchable single select" should be valid

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
    And I click "Orange" from the select field with label "Searchable single select"

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
    And I select "Mango" by searching the select field with label "Searchable single select"
    And I select the following options by searching for "Ap" the select field with label "Searchable multi select"
      | Aprium  |
      | Apricot |
    And I click "Free admission" from the select field with label "Term select"
    And I click "Seniors" from the select field with label "Term select"
    And I click "Dog person" from the radio group with label "Type of person"
    And I click "London" from the checkbox group with label "Favourite Locations"
    And I click "Tokyo" from the checkbox group with label "Favourite Locations"
    And I toggle the checkbox with label "Terms and conditions"

    And I submit the form with ID "full_form"

    Then a server message should be displayed above the form
      | status  | title          | description          |
      | success | Server success | Test success message |

    And the dataLayer should include the following events
      | event             | label                    | form_id   | field_id                     | type     | value                  | component               |
      | update_form_field | First name               | full_form | first_name                   | text     | [redacted]             | rpl-form-input          |
      | update_form_field | Last name                | full_form | last_name                    | text     | [redacted]             | rpl-form-input          |
      | update_form_field | Email                    | full_form | email                        | email    | [redacted]             | rpl-form-input          |
      | update_form_field | Quantity                 | full_form | quantity                     | number   | [redacted]             | rpl-form-number         |
      | update_form_field | Website                  | full_form | website                      | url      | [redacted]             | rpl-form-input          |
      | update_form_field | Mobile phone             | full_form | mobile_phone                 | tel      | [redacted]             | rpl-form-input          |
      | update_form_field | Message                  | full_form | message                      | textarea | [redacted]             | rpl-form-textarea       |
      | open_form_field   | Favourite colour         | full_form | favourite_colour             | select   |                        | rpl-form-dropdown       |
      | update_form_field | Favourite colour         | full_form | favourite_colour             | select   | Green                  | rpl-form-dropdown       |
      | open_form_field   | Searchable single select | full_form | searchable_single_select     | select   |                        | rpl-form-dropdown       |
      | update_form_field | Searchable single select | full_form | searchable_single_select     | select   | Mango                  | rpl-form-dropdown       |
      | open_form_field   | Searchable multi select  | full_form | searchable_multi_select      | select   |                        | rpl-form-dropdown       |
      | update_form_field | Searchable multi select  | full_form | searchable_multi_select      | select   | Aprium                 | rpl-form-dropdown       |
      | update_form_field | Searchable multi select  | full_form | searchable_multi_select      | select   | Apricot                | rpl-form-dropdown       |
      | open_form_field   | Term select              | full_form | term_select                  | select   |                        | rpl-form-dropdown       |
      | update_form_field | Term select              | full_form | term_select                  | select   | Free admission         | rpl-form-dropdown       |
      | open_form_field   | Term select              | full_form | term_select                  | select   | Free admission         | rpl-form-dropdown       |
      | update_form_field | Term select              | full_form | term_select                  | select   | Free admission,Seniors | rpl-form-dropdown       |
      | update_form_field | Type of person           | full_form | person_type                  | radio    | Dog person             | rpl-form-radio-group    |
      | update_form_field | Favourite Locations      | full_form | favourite_locations          | checkbox | London                 | rpl-form-checkbox-group |
      | update_form_field | Favourite Locations      | full_form | favourite_locations          | checkbox | London,Tokyo           | rpl-form-checkbox-group |
      | update_form_field | I accept the terms       | full_form | i_accept_the_terms__checkbox | checkbox | true                   | rpl-form-option         |

    And the dataLayer should include the following events
      | event         | form_id   | form_valid | element_text | component |
      | form_submit   | full_form | true       | Submit       | rpl-form  |
      | form_complete | full_form |            | Submit       | rpl-form  |

    And the dataLayer form data for "form_complete" should include the following values
      | key                      | value                  |
      | first_name               | [redacted]             |
      | last_name                | [redacted]             |
      | role                     | [redacted]             |
      | email                    | [redacted]             |
      | quantity                 | [redacted]             |
      | website                  | [redacted]             |
      | mobile_phone             | [redacted]             |
      | dob                      | [redacted]             |
      | message                  | [redacted]             |
      | favourite_colour         | Green                  |
      | searchable_single_select | Mango                  |
      | term_select              | Free admission,Seniors |
      | person_type              | Dog person             |
      | favourite_locations      | London,Tokyo           |
      | i_accept_the_terms       | true                   |
      | site_section             | DPC                    |
