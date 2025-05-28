Feature: Multi Step Forms

  Background:
    Given the page endpoint for path "/multistep-form" returns fixture "/landingpage/multistep-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: Renders form
    When I visit the page "/multistep-form"
    Then the landing page component "TideLandingPageWebForm" should exist
    And the form with ID "multistep" should exist
    And the form step 1 of 3 named "Details" should be visible
    And the form progress bar should display the steps
      | label    | status  |
      | Details  | active  |
      | Location | pending |
      | Finish   | pending |
    And a "text" input with the label "Name" should exist
    And a "email" input with the label "Email" should exist
    And a "tel" input with the label "Phone" should exist
    And a checkbox field with the label "Add contact preference" should exist

  @mockserver
  Scenario: Can navigate between steps
    When I visit the page "/multistep-form"
    Then I type "John Smith" into the input with the label "Name"
    And I type "0400123456" into the input with the label "Phone"

    Then I navigate to the next form step by clicking "Continue"
    Then the form step 2 of 3 named "Location" should be visible
    And the form progress bar should display the steps
      | label    | status   |
      | Details  | complete |
      | Location | active   |
      | Finish   | pending  |
    And the main form steps container should have focus
    And I should be scrolled to the top of the form step with an offset of 92

    When I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    And I navigate to the next form step by clicking "Go forwards"
    Then the form step 3 of 3 named "Finish" should be visible
    And the form progress bar should display the steps
      | label    | status   |
      | Details  | complete |
      | Location | complete |
      | Finish   | active   |
    And the main form steps container should have focus
    And I should be scrolled to the top of the form step with an offset of 92

    When I navigate to the previous form step by clicking "Back"
    Then the form step 2 of 3 named "Location" should be visible
    And the form progress bar should display the steps
      | label    | status   |
      | Details  | complete |
      | Location | active   |
      | Finish   | pending  |
    And the main form steps container should have focus

    When I navigate to the previous form step by clicking "Go backwards"
    Then the form step 1 of 3 named "Details" should be visible
    And the form progress bar should display the steps
      | label    | status  |
      | Details  | active  |
      | Location | pending |
      | Finish   | pending |
    And the main form steps container should have focus

    Then the dataLayer should include the following events
      | event              | form_step | target_form_step | form_id   | form_name      | index | target_index | element_text | component |
      | form_step_forward  | Details   | Location         | multistep | MultiStep Form | 1     | 2            | Continue     | rpl-form  |
      | form_step_forward  | Location  | Finish           | multistep | MultiStep Form | 2     | 3            | Go forwards  | rpl-form  |
      | form_step_backward | Finish    | Location         | multistep | MultiStep Form | 3     | 2            | Back         | rpl-form  |
      | form_step_backward | Location  | Details          | multistep | MultiStep Form | 2     | 1            | Go backwards | rpl-form  |

  @mockserver
  Scenario: Validation applies only to the current step
    When I visit the page "/multistep-form"
    Then I navigate to the next form step by clicking "Continue"
    Then the input with the label "Name" should be invalid with message "Name is required"
    And the input with the label "Phone" should be invalid with message "A valid phone number is essential"
    And the steps error summary should display with the following errors
      | text                              | url              |
      | Name is required                  | #multistep_name  |
      | A valid phone number is essential | #multistep_phone |

    When I type "John Smith" into the input with the label "Name"
    Then I toggle the checkbox with label "Add contact preference"
    And I navigate to the next form step by clicking "Continue"
    And the steps error summary should display with the following errors
      | text                              | url                     |
      | A valid phone number is essential | #multistep_phone        |
      | Contact type is required          | #multistep_contact_type |

    Then I type "0400123456" into the input with the label "Phone"
    And I click "Phone" from the radio group with label "Contact type"
    And I navigate to the next form step by clicking "Continue"
    And the error summary should not display

    When I navigate to the next form step by clicking "Go forwards"
    And the steps error summary should display with the following errors
      | text                              | url                      |
      | A valid delivery slot is required | #multistep_delivery_slot |
    Then I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    And I navigate to the next form step by clicking "Go forwards"

    When I submit the form with ID "multistep"
    Then the steps error summary should display with the following errors
      | text                                                         | url                            |
      | How did you find us is required                              | #multistep_how_did_you_find_us |
      | I have read and understood the privacy statement is required | #multistep_privacy_statement   |

    When I navigate to the previous form step by clicking "Back"
    And the error summary should not display
    When I navigate to the previous form step by clicking "Go backwards"
    And the error summary should not display

    Then the dataLayer should include the following events
      | event       | form_step | form_id   | form_name      | form_valid | index | element_text | component |
      | form_submit | Finish    | multistep | MultiStep Form | false      | 3     | Submit       | rpl-form  |

  @mockserver
  Scenario: Conditional logic works across steps
    When I visit the page "/multistep-form"
    Then a field with the label "Contact type" should not exist
    When I toggle the checkbox with label "Add contact preference"
    Then a field with the label "Contact type" should exist
    When I toggle the checkbox with label "Add contact preference"
    Then a field with the label "Contact type" should not exist

    When I type "John Smith" into the input with the label "Name"
    And I type "0400123456" into the input with the label "Phone"
    And I navigate to the next form step by clicking "Continue"
    Then the form step 2 of 3 named "Location" should be visible
    Then a "text" input with the label "Delivery for vic.gov" should exist
    And a field with the label "Your delivery instructions" should not exist

    When I toggle the checkbox with label "Include delivery instructions"
    Then a textarea field with the label "Your delivery instructions" should exist
    And I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"

    When I navigate to the next form step by clicking "Go forwards"
    Then the form step 3 of 3 named "Finish" should be visible
    Then a field with the label "Preferred contact time" should not exist

    When I navigate to the previous form step by clicking "Back"
    Then I navigate to the previous form step by clicking "Go backwards"
    And I type "email@vic.gov.au" into the input with the label "Email"
    And I toggle the checkbox with label "Add contact preference"
    And I click "Phone" from the radio group with label "Contact type"

    When I navigate to the next form step by clicking "Continue"
    Then the form step 2 of 3 named "Location" should be visible
    And a field with the label "Delivery for vic.gov" should not exist

    When I navigate to the next form step by clicking "Go forwards"
    Then the form step 3 of 3 named "Finish" should be visible
    And a select field with the label "Preferred contact time" should exist

  @mockserver
  Scenario: Form submission - Error
    Given posting form to endpoint "/api/tide/webform_submission/multistep" returns fixture "/landingpage/full-form-error-response" with status 500
    When I visit the page "/multistep-form"
    Then I type "John Smith" into the input with the label "Name"
    And I type "0400123456" into the input with the label "Phone"

    Then I navigate to the next form step by clicking "Continue"
    And I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    And I navigate to the next form step by clicking "Go forwards"

    Then I click "Online" from the checkbox group with label "How did you find us"
    And I toggle the checkbox with label "Privacy statement"

    When I submit the form with ID "multistep"
    Then a server message should be displayed above the form
      | status | title              | description                                                                 |
      | error  | Form not submitted | We are experiencing a server error. Please try again, otherwise contact us. |

  @mockserver
  Scenario: Form submission - Success
    Given posting form to endpoint "/api/tide/webform_submission/multistep" returns fixture "/landingpage/full-form-success-response" with status 201
    When I visit the page "/multistep-form"
    Then I type "John Smith" into the input with the label "Name"
    And I type "test@mail.co" into the input with the label "Email"
    And I type "0400123456" into the input with the label "Phone"

    Then I navigate to the next form step by clicking "Continue"
    And I wait 400 milliseconds
    And I click "Victoria" from the select field with label "State"
    And I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    And I click "High" from the radio group with label "Priority"

    Then I navigate to the next form step by clicking "Go forwards"
    And I wait 400 milliseconds
    And I click "Online" from the checkbox group with label "How did you find us"
    And I toggle the checkbox with label "Privacy statement"

    When I submit the form with ID "multistep"
    Then a server message should be displayed above the form
      | status  | title          | description                                  |
      | success | Form submitted | Thank you! Your response has been submitted. |
    And the form step 1 of 3 named "Details" should be visible
    And the form progress bar should display the steps
      | label    | status  |
      | Details  | active  |
      | Location | pending |
      | Finish   | pending |

    And the dataLayer should include the following events
      | event             | label                                             | form_id   | field_id                              | form_step | index | type     | value               | component               |
      | update_form_field | Name                                              | multistep | multistep_name                        | Details   | 1     | text     | [redacted]          | rpl-form-input          |
      | update_form_field | Email                                             | multistep | multistep_email                       | Details   | 1     | email    | [redacted]          | rpl-form-input          |
      | update_form_field | Phone                                             | multistep | multistep_phone                       | Details   | 1     | tel      | [redacted]          | rpl-form-input          |
      | open_form_field   | State                                             | multistep | multistep_address_administrative_area | Location  | 2     | select   |                     | rpl-form-dropdown       |
      | update_form_field | State                                             | multistep | multistep_address_administrative_area | Location  | 2     | select   | Victoria            | rpl-form-dropdown       |
      | update_form_field | Delivery slot                                     | multistep | multistep_delivery_slot               | Location  | 2     | checkbox | Monday to Wednesday | rpl-form-checkbox-group |
      | update_form_field | Priority                                          | multistep | multistep_delivery_priority           | Location  | 2     | radio    | High                | rpl-form-radio-group    |
      | update_form_field | How did you find us                               | multistep | multistep_how_did_you_find_us         | Finish    | 3     | checkbox | Online              | rpl-form-checkbox-group |
      | update_form_field | I have read and understood the privacy statement. | multistep | multistep_privacy_statement__checkbox | Finish    | 3     | checkbox | true                | rpl-form-option         |

    And the dataLayer should include the following events
      | event         | form_id   | form_valid | form_step | index | element_text | component |
      | form_start    | multistep |            | Details   | 1     |              | rpl-form  |
      | form_submit   | multistep | true       | Finish    | 3     | Submit       | rpl-form  |
      | form_complete | multistep |            | Finish    | 3     | Submit       | rpl-form  |

    And the dataLayer form data for "form_submit" should include the following values
      | step     | key                  | value               |
      | details  | site_section         | DPC                 |
      | details  | name                 | [redacted]          |
      | details  | email                | [redacted]          |
      | details  | phone                | [redacted]          |
      | location | delivery_slot        | Monday to Wednesday |
      | location | delivery_for_vic_gov | [redacted]          |
      | finish   | how_did_you_find_us  | Online              |
      | finish   | privacy_statement    | true                |

    And the dataLayer form data for "form_complete" should include the following values
      | step     | key                  | value               |
      | details  | site_section         | DPC                 |
      | details  | name                 | [redacted]          |
      | details  | email                | [redacted]          |
      | details  | phone                | [redacted]          |
      | location | delivery_slot        | Monday to Wednesday |
      | location | delivery_for_vic_gov | [redacted]          |
      | finish   | how_did_you_find_us  | Online              |
      | finish   | privacy_statement    | true                |

  @mockserver
  Scenario: Progress bar is hidden when the sidebar is visible
    Given I load the page fixture with "/landingpage/multistep-form"
    And the social share links are enabled
    And the page endpoint for path "/multistep-form-sidebar" returns the loaded fixture
    When I visit the page "/multistep-form-sidebar"
    Then the form progress bar should be hidden

  @mockserver
  Scenario: Form Review - Display
    When I visit the page "/multistep-form"
    Then I type "John Smith" into the input with the label "Name"
    And I type "0400123456" into the input with the label "Phone"
    Then I toggle the checkbox with label "Add contact preference"
    And I click "Phone" from the radio group with label "Contact type"

    Then I navigate to the next form step by clicking "Continue"
    Then I type "DPC" into the input with the label "Organization"
    And I type "1 Lane" into the input with the label "Street address"
    And I type "Brunswick" into the input with the label "Suburb"
    And I click "Victoria" from the select field with label "State"
    And I type "3056" into the input with the label "Postcode"
    And I toggle the checkbox with label "Include delivery instructions"
    And I type "Post haste" into the textarea with the label "Your delivery instructions"
    And I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    And I type 20 02 2025 into the date input with the label "Delivery date"

    When I navigate to the next form step by clicking "Go forwards"
    Then the form review component should display the following "details"
      | question               | answer       | link                              |
      | Name                   | John Smith   | #multistep_name                   |
      | Email                  | Not provided | #multistep_email                  |
      | Phone                  | 0400123456   | #multistep_phone                  |
      | Add contact preference | Yes          | #multistep_add_contact_preference |
      | Contact type           | Phone        | #multistep_contact_type           |
    Then the form review component should display the following "location"
      | question                      | answer              | link                                     |
      | Organization                  | DPC                 | #multistep_address_organization          |
      | Given name                    | Not provided        | #multistep_address_given_name            |
      | Family name                   | Not provided        | #multistep_address_family_name           |
      | Street address                | 1 Lane              | #multistep_address_address_line1         |
      | Street address line 2         | Not provided        | #multistep_address_address_line2         |
      | Suburb                        | Brunswick           | #multistep_address_locality              |
      | State                         | Victoria            | #multistep_address_administrative_area   |
      | Postcode                      | 3056                | #multistep_address_postal_code           |
      | Include delivery instructions | Yes                 | #multistep_include_delivery_instructions |
      | Your delivery instructions    | Post haste          | #multistep_delivery_instructions         |
      | Priority                      | Not provided        | #multistep_delivery_priority             |
      | Delivery slot                 | Monday to Wednesday | #multistep_delivery_slot                 |
      | Delivery date                 | 20 Feb 2025         | #multistep_delivery_date                 |
      | Delivery for vic.gov          | Not provided        | #multistep_delivery_for_vic_gov          |

    When I edit "Email" in the review section for "details"
    Then the form step 1 of 3 named "Details" should be visible
    And the field labelled "Email" should have focus

    When I navigate to the next form step by clicking "Continue"
    Then I navigate to the next form step by clicking "Go forwards"
    Then I edit "State" in the review section for "location"
    Then the form step 2 of 3 named "Location" should be visible
    And the field labelled "State" should have focus

    Then the dataLayer should include the following events
      | event              | form_step | target_form_step | form_id   | index | target_index | element_text | component |
      | form_step_backward | Finish    | Details          | multistep | 3     | 1            | Change       | rpl-form  |
      | form_step_backward | Finish    | Location         | multistep | 3     | 2            | Change       | rpl-form  |

  @mockserver
  Scenario: Form Review - Conditionally hidden and hidden fields aren't shown
    When I visit the page "/multistep-form"
    Then I type "John Smith" into the input with the label "Name"
    And I type "0400123456" into the input with the label "Phone"

    When I navigate to the next form step by clicking "Continue"
    And I click "Monday to Wednesday" from the checkbox group with label "Delivery slot"
    Then I navigate to the next form step by clicking "Go forwards"
    Then the form review component should not display the following "details"
      | question     |
      | Site ID      |
      | Site section |
      | Contact type |
    Then the form review component should not display the following "location"
      | question                   |
      | Your delivery instructions |
