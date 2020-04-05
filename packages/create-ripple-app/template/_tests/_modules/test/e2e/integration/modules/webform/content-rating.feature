Feature: Content rating form
  
  As a public user I can submit feedback about a page

  Scenario: Submit a content rating form - success
    Given I stubbed the form "tide_webform_content_rating" response with "modules/webforms/content-rating-form-success" fixture
    And I visit the page "/"
    And I enter the following into the content rating form:
      | helpful | comment                |
      | Yes     | this is a test comment |
    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form success message

  Scenario: Submit a content rating form - failure
    Given I stubbed the form "tide_webform_content_rating" response with "modules/webforms/content-rating-form-failure" fixture
    And I visit the page "/"
    And I enter the following into the content rating form:
      | helpful | comment                |
      | Yes     | this is a test comment |
    And I click the form submit button "Submit"
    When I wait for 5 seconds
    Then I should see the form failure message

