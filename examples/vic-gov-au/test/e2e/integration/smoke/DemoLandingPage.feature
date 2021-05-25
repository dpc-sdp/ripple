Feature: Demo Page

   Demo landing page with all components

  Background:
    Given I visit the page "/demo-landing-page"

  @smoke
  Scenario: Demo landing page loads correctly
    Then the current page should not be an error page
    And the page title should be "Demo Landing Page"
    And the h1 should be "Demo Landing Page"
    And the breadcrumbs should exist
    And there should be 2 breadcrumb items
    And the site header is visible
    And the site footer is visible
  # All components load correctly
    And the anchor links component should exist
    And the content rating component should exist
    And the hero banner component should exist
    And the intro banner component should exist
    And the campaign primary banner component should exist
    And the body markup component should exist
    And the featured news list component should exist
    And the featured card navigation component should exist
    And the card event component should exist
    # And the card keydates component should exist
    And the card promotion component should exist
    And the card promo component should exist
    And the card nav component should exist
    And the card carousel component should exist
    And the accordion component should exist
    And the news listing component should exist
    # And the timeline component should exist
    And the image gallery component should exist
    And the related links component should exist
    And the contact component should exist
    And the whats next component should exist
    And the share this component should exist

  @audit
  Scenario: There are no audit issue
    And should verify the lighthouse scores
      | metric            | threshold |
      | performance       | 50        |

# Need to fix existing errors or work out ruleset to skip
  # Scenario: There are no accessibility errors
    # Then it has no detectable a11y violations on load
