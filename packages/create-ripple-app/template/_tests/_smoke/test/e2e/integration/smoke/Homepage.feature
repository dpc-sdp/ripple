Feature: Home Page

   Home landing page 

  Background: 
    Given I visit the page "/"

  @smoke
  Scenario: Home landing page loads correctly
    And the page title should be set
    And the h1 should be set
    And the breadcrumbs should not exist
    And the site header is visible
    And the site footer is visible

# Need to fix existing errors or work out ruleset to skip
  @a11y @skip
  Scenario: There are no accessibility errors
    Then it has no detectable a11y violations on load