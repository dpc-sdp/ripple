Feature: Landing Page Components

  Creating a landing page with components

  # After : Delete node @nodeId

  Scenario: Simple landing page example
    Given I have created a landing page with the json fixture "Pages/LandingPage/simple"
    And I have navigated to the created test page
    Then the site header is visible


  Scenario: Complex landing page example
    Given I have created a landing page with the json fixture "Pages/LandingPage/complex"
    And I have navigated to the created test page
    Then the site header is visible
    Then the site footer is visible
  
  @a11y @skip
  Scenario: There are no accessibility errors
    Given I have created a landing page with the json fixture "Pages/LandingPage/simple"
    And I have navigated to the created test page
    Then it has no detectable a11y violations on 
    
  @focus
  Scenario: Landing page complex example
    Given I have created a node with the YAML fixture "Pages/LandingPage/complex.yml"
    And I have navigated to the page "/5-be-land-3-landing-page-complete-test"
    And the page title should be "5-BE-land-3 Landing Page - Complete Test"
    And the hero banner title should be "5-BE-land-3 Landing Page - Complete Test"
    And the hero banner desciption should be "5-BE-land-3 Landing Page - Complete Test Intro"