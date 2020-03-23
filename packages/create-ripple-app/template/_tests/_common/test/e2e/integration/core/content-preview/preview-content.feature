Feature: Preview content

  As an authorized user I want to be able to view previews which are not visible to the general public.
  
  Scenario: BE - Create draft page
    Given I have logged into the backend
    And in the backend there is a node at "/1-fe-content-preview-1" with "content-preview/1-fe-content-preview-1" data
    And in the backend there is a user "users/user-2"
  
  Scenario: No access to a draft page when unauthenticated
    When I attempt to visit the page "/1-fe-content-preview-1"
    Then I should see a 404 page

  Scenario: Accessing a preview when unauthorized redirects to login
    When I attempt to visit the page "/preview/landing_page/e9db742d-3a43-40fa-81e2-f81b4f0f7a27/latest?section=4"	
    Then the current page url should be "/login"
  
  Scenario: Accessing a preview when authenticated shows page
    When I visit the page "/preview/landing_page/e9db742d-3a43-40fa-81e2-f81b4f0f7a27/latest?section=4"
    And I enter the the following login credentials:
      | login                  | password  |
      | e2e-test-2@example.com | ******** |
    And I submit the login form
    And I wait for 8 seconds
    Then the current page url should be "/preview/landing_page/e9db742d-3a43-40fa-81e2-f81b4f0f7a27/latest"
    Then the current page should not be an error page
    And there should be a draft banner 
    And there should be a header logout button
    And the h1 should be "1-FE-content-preview-1"
