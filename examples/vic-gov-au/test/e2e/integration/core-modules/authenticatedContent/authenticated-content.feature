Feature: Protected content

   As authorized I want to be able to login to the site so I can view pages which are not for the general public
  
  Scenario: BE - Setup environment
    Given I have logged into the backend
    And in the backend there is a role "test-role"
    And in the backend there is a user "users/user-1"
    And in the backend there is a node at "/authenticatedcontent/test-auth-term" with "authenticatedContent/taxonomy" data
    And the authenticated content term "test" has the role "test_role"
    And in the backend there is a node at "/1-fe-auth-content-4" with "authenticatedContent/1-FE-auth-content-4" data
  
  Scenario: 1-FE-auth-content-1 - Login form renders correctly
    Given I visit the page "/login"
    Then there should be a login form with the title "Login"
    And there should be a form field with the label "Username"
    And there should be a form field with the label "Password"
    And there should be a submit button with the text "Submit"
    And there should be a login form button with the text "Register"
    And there should be a login form button with the text "Forgot password"
  
  Scenario: 1-FE-auth-content-3 - Login failure
    Given I visit the page "/login"
    When I enter the the following login credentials:
      | login     | password   |
      | dummyuser | Pasword-21 |
    And I submit the login form
    Then the login status colour should should be "red"
    And the login status message should be "Login Failed. Please try again"
  
  Scenario: 1-FE-auth-content-4 - Should not be able to access a protected content page when unauthenticated
    When I attempt to visit the page "/1-fe-auth-content-4"
    Then I should see a 404 page
  
  Scenario: 1-FE-auth-content-2 - Login success
    And I visit the page "/login"
    When I enter the the following login credentials:
      | login                  | password  |
      | e2e-test-1@example.com | ********  |
    And I submit the login form
    Then the login status colour should should be "green"
    And the login status message should be "Login Successful."

  Scenario: Accessing a protected content page when authenticated
    When I visit the page "/login"
    When I enter the the following login credentials:
      | login                  | password  |
      | e2e-test-1@example.com | ********  |
    And I submit the login form
    Then the current page url should be "/"
    When I wait for 3 seconds
    Given I visit the page "/1-fe-auth-content-4"
    Then the page title should be "1-FE-auth-content-4"
    And the h1 should be "1-FE-auth-content-4"
