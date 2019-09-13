Feature: Anchor link

  When user request a url with anchor link,
  who should see the page scroll to the target.

  @smoke
  Scenario: Visit a url with anchor link
    Given the "/anchorlink-test" page exists with fixture "page/anchorlinktest" data
    When I visit the page "/anchorlink-test"
    And I click the link "/demo-landing-page#accordion-header-basic"
    Then the anchor linked item goes to the top of the page
