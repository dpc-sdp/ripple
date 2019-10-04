Feature: Anchor link

  As a citizen I need to be able to scroll to a section in the page content when clicking an anchor link

  Scenario: Visit a url with anchor link via link
    Given the "/anchorlink-test" page exists with fixture "page/anchorlinktest" data
    When I visit the page "/anchorlink-test"
    And I click the link "/demo-landing-page#accordion-header-basic"
    Then the anchor linked item goes to the top of the page

  Scenario: Visit a url with anchor link
    Given I visit the page "/demo-landing-page#accordion-header-basic"
    And the anchor linked item goes to the top of the page
  
