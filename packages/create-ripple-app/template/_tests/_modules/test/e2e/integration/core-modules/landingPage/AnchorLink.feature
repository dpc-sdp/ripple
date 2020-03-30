Feature: Anchor link

  As a citizen I need to be able to scroll to a section in the page content when clicking an anchor link

  Scenario: BE - Create landingpage
    Given I have logged into the backend
    And in the backend there is a node at "/anchorlink-test" with "page/anchorlinktest" data

  Scenario: FE - Visit a url with anchor link via link
    When I visit the page "/anchorlink-test"
    And I click the link "/demo-landing-page#accordion-header-basic"
    When I wait for 4 seconds
    Then the current page url should be "/demo-landing-page#accordion-header-basic"
    Then the page should scroll to "#accordion-header-basic"

  Scenario: FE - Visit a url with anchor link
    Given I visit the page "/demo-landing-page#accordion-header-basic"
    When I wait for 8 seconds
    And the page should scroll to "#accordion-header-basic"
  
