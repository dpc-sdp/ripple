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

  @audit
  Scenario: There are no audit issue
    And should verify the lighthouse scores
      | metric            | threshold |
      | performance       | 50        |
      | best-practices    | 79        |
      | seo               | 85        |

# Need to fix existing errors or work out ruleset to skip
  @a11y @skip
  Scenario: There are no accessibility errors
    Then it has no detectable a11y violations on load