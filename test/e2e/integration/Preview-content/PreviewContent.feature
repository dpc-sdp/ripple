Feature: Preview content

  As an authorized user I want to be able to view previews which are not visible to the general public.

  Scenario: No access to a draft page when unauthenticated
    Given I have created a landing page with the json fixture "Pages/LandingPage/draft"
    When I have navigated to the created test page
    Then I should see a 404 page
    And the created page should be removed

  Scenario: Accessing a preview when unauthorized redirects to login
    Given I have created a landing page with the json fixture "Pages/LandingPage/draft"
    And I have navigated to the created preview page
    Then there should be a redirect to "/login"
    And there should be a preview destination query string
    And the created page should be removed

  @skip
  Scenario: Accessing a preview when authenticated shows page
    Given there is a user in the system with the following credentials:
      | login     | password     | active | email                    | role      |
      | testuser1 | Password-111 | true   | testuser1@mailinator.com | Previewer |
    And I have created a landing page with the json fixture "Pages/LandingPage/draft"
    And I have navigated to the created preview page
    When I enter the the following login credentials:
      | login     | password     |
      | testuser1 | Password-111 |
    And I submit the login form
    And I wait for 6 seconds
    Then I should be redirected to the preview page
    And there should be a draft banner
    And there should be a header logout button
    And the h1 should be "Test landing page basic"
    And the created page should be removed
    And the created user should be removed
