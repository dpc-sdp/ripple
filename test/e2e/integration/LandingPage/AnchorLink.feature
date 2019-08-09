Feature: Anchor link

  When user request a url with anchor link,
  who should see the page scroll to the target.

  @smoke
  Scenario: Visit a url with anchor link
    Given I visit the page "/demo-landing-page#accordion-header-basic"
    And the anchor linked item goes to the top of the page
