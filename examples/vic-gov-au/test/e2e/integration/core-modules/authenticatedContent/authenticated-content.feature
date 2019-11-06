Feature: Protected content

   As authorized I want to be able to login to the site so I can view pages which are not for the general public
  
  @skip
  # Scenario: Setup role
  #   Given the role "testrole" exists in the backend
  #   And the authenticated content module is configured with:
  #     | role     | term      |
  #     | testrole | testterm  |    

  Scenario: 1-FE-auth-content-1 - Login form renders correctly
    Given I visit the page "/login"
    Then there should be a login form with the title "Login"
    And there should be a form field with the label "Username"
    And there should be a form field with the label "Password"
    And there should be a submit button with the text "Submit"
    And there should be a login form button with the text "Register"
    And there should be a login form button with the text "Forgot password"
  
  Scenario: 1-FE-auth-content-2 - Login success
    Given there is a user in the system with the following credentials:
      | login     | password     | active | email                    |
      | testuser1 | Password-111 | true   | testuser1@mailinator.com |
    And I visit the page "/login"
    When I enter the the following login credentials:
      | login     | password     |
      | testuser1 | Password-111 |
    And I submit the login form
    Then the login status colour should should be "green"
    And the login status message should be "Login Successful."

  Scenario: 1-FE-auth-content-3 - Login failure
    Given I visit the page "/login"
    When I enter the the following login credentials:
      | login     | password   |
      | dummyuser | Pasword-21 |
    And I submit the login form
    Then the login status colour should should be "red"
    And the login status message should be "Login Failed. Please try again"
  
  @skip
  Scenario: 1-FE-auth-content-4 - Should not be able to access a protected content page when unauthenticated
    Given the "/1-fe-auth-content-4" page exists with fixture "authenticatedContent/1-FE-auth-content-4" data
    When I attempt to visit the page "/1-fe-auth-content-4"
    Then I should see a 404 page
  
  @skip
  Scenario: Accessing a protected content page when authenticated
    Given the "/1-fe-auth-content-4" page exists with fixture "authenticatedContent/1-FE-auth-content-4" data
    And there is a user in the system with the following credentials:
      | login     | password     | active | email                    | role     |
      | testuser2 | Password-222 | true   | testuser2@mailinator.com | testrole |
    And I visit the page "/login"
    When I enter the the following login credentials:
      | login     | password     |
      | testuser2 | Password-222 |
    And I submit the login form
    Then I should be redirected to the page "/"
    Given I visit the page "/1-fe-auth-content-4"
    Then the page title should be "1-FE-auth-content-4"
    And the h1 should be "1-FE-auth-content-4"

  @skip
  Scenario: Can still navigate after session is expired
    Given the "/1-fe-auth-content-4" page exists with fixture "authenticatedContent/1-FE-auth-content-4" data
    And there is a user in the system with the following credentials:
      | login     | password     | active | email                    | role     |
      | testuser3 | Password-333 | true   | testuser3@mailinator.com | testrole |
    And I visit the page "/login"
    When I enter the the following login credentials:
      | login     | password     |
      | testuser3 | Password-333 |
    And I submit the login form
    Then I should be redirected to the page "/"
    When I visit the page "/1-fe-auth-content-4"
    Then the page title should be "1-FE-auth-content-4"
    And the h1 should be "1-FE-auth-content-4"
    When I wait for 60 seconds
    And I attempt to visit the page "/1-fe-auth-content-4"
    Then I should see a 404 page
    When I visit the page "/"
    Then the menu should have 2 top level items
    And the logout button should not be visible

