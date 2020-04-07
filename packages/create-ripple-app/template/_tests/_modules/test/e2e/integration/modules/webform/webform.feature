Feature: Webform
  
  As a site admin I can create a webform and receive submissions
  
  Scenario: BE - Create a custom webform
    Given I have logged into the backend
    Given in the backend there there is a form named "test-form" with the fixture "modules/webforms/test_form"
    And in the backend there is a node at "/test-form" with "modules/webforms/test-form-page" data
  
  Scenario: FE - test form submission
    When I visit the page "/test-form"
    Given I stubbed the form "test_form_1" response with "modules/webforms/contact-us-form-success" fixture
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
      
    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form success message
  
  Scenario: FE - test form submission failure
    When I visit the page "/test-form"
    Given I stubbed the form "test_form_1" response with "modules/webforms/contact-us-form-failure" fixture
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
      
    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form failure message
  
  Scenario: FE - test form validation
    When I visit the page "/test-form"
    When I click the form submit button "Submit"
    And I should see 4 form validation errors

