Feature: Webform
  
  As a site admin I can create a webform and receive submissions

  Scenario: BE - Create a custom webform
    Given I have logged into the backend
    Given in the backend there there is a form named "test-form" with the fixture "webforms/test_form"
    And in the backend there is a page at "/test-form" with "webforms/test-form-page" data
  
  Scenario: FE - test form submission
    When I visit the page "/test-form"
    Given I stubbed the form "test_form_1" response with "webforms/contact-us-form-success" fixture
    And i enter the following information into the form "form-test_form_1":
      | label                                                                                | value                 | type       |
      | Text field                                                                           | General enquiry       | text       |
      | Textarea                                                                             | test                  | textarea   |
      | Email                                                                                | tester@mailinator.com | email      |
      | Telephone                                                                            | 03 999 0000           | tel        |
      | Number                                                                               | 12345678910           | number     |
      | Select                                                                               | Option 1              | rpl-select |
      | Date                                                                                 | 18/03/2020            | date       |
      | Radios                                                                               | Option 2              | radios     |
      | Checkboxes                                                                           | true                  | checkbox   |
      | I have read and understand how Department of Premier and Cabinet stores information. | true                  | checkbox   |
      
    And I submit the form named "form-test_form_1"
    Then I should see the form success message
  
  Scenario: FE - test form submission failure
    When I visit the page "/test-form"
    Given I stubbed the form "test_form_1" response with "webforms/contact-us-form-failure" fixture
    And i enter the following information into the form "form-test_form_1":
      | label                                                                                | value                 | type       |
      | Text field                                                                           | General enquiry       | text       |
      | Textarea                                                                             | test                  | textarea   |
      | Email                                                                                | tester@mailinator.com | email      |
      | Telephone                                                                            | 03 999 0000           | tel        |
      | Number                                                                               | 12345678910           | number     |
      | Select                                                                               | Option 1              | rpl-select |
      | Date                                                                                 | 18/03/2020            | date       |
      | Radios                                                                               | Option 2              | radios     |
      | Checkboxes                                                                           | true                  | checkbox   |
      | I have read and understand how Department of Premier and Cabinet stores information. | true                  | checkbox   |
      
    And I submit the form named "form-test_form_1"
    Then I should see the form failure message
  
  Scenario: Submit a contact form - validation
    When I visit the page "/test-form"
    When I click the "Submit" submit button
    And I should see 4 form validation errors
