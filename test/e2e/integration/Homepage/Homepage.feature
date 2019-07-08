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
    And the campaign primary banner component should exist

# Need to fix existing errors or work out ruleset to skip
  @a11y
  Scenario: There are no accessibility errors
    Then it has no detectable a11y violations on load