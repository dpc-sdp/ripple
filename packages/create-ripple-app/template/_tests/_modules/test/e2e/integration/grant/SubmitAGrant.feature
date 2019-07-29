Feature: Submit a grant

   Form to submit a grant

  #  Before : Create Landing page with submit a grant form
  
  Scenario: Submitting a form successfully
    Given I have navigated to the created page
    Then the page title should be "Submit a grant landing page"
    Then the form title should be "Submit a grant"
    Given I have entered the form correctly
    When I submit the form
    Then I should see the form success message
    And the form submission should be saved

  Scenario: Client side error validation
    Given I have navigated to the created test page
    And I dont fill out any fields
    When I submit the form
    Then I should see 10 validation errors