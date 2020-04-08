Feature: Contact form
  
  As a public user I can submit a question to the site authors
  
  Scenario: Submit a contact form - success
    Given I stubbed the form "connect_with_us" response with "modules/webform/contact-us-form-success" fixture
    And I visit the page "/contact-us"
    And i enter the following information into the form "form-connect_with_us":
      | label                               | value                     | type       |
      | What type of enquiry do you have?   | General enquiry           | rpl-select |
      | What best describes your enquiry?   | test                      | textarea   |
      | Full name                           | Dylan kelly               | text       |
      | Email address                       | test-dpc@mailinator.com   | text       |
      | Contact number                      | 03 9999 9999              | tel        |
      | I have read and understand how Department of Premier and Cabinet stores information. | true              | checkbox |

    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form success message
  
  Scenario: Submit a contact form - submission failure
    Given I stubbed the form "connect_with_us" response with "modules/webform/contact-us-form-failure" fixture
    And I visit the page "/contact-us"
    And i enter the following information into the form "form-connect_with_us":
      | label                               | value                     | type       |
      | What type of enquiry do you have?   | General enquiry           | rpl-select |
      | What best describes your enquiry?   | test                      | textarea   |
      | Full name                           | Dylan kelly               | text       |
      | Email address                       | test-dpc@mailinator.com   | text       |
      | Contact number                      | 03 9999 9999              | tel        |
      | I have read and understand how Department of Premier and Cabinet stores information. | true              | checkbox |

    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form failure message
  
  Scenario: Submit a contact form - validation
    Given I stubbed the form "tide_webform_contact_us" response with "modules/webform/contact-us-form-failure" fixture
    And I visit the page "/contact-us"
    When I click the form submit button "Submit"
    And I should see 4 form validation errors

