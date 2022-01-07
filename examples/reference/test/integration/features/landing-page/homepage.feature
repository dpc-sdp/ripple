Feature: Home page

  As a citizen I want to see current relevant links and events.

@focus 
  Scenario: On load - desktop
    Given the mock server has started
    And I am using a "macbook-13" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200 
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/&site=4" returns fixture "landing-page/homepage" with status 200 
    When I visit the page "/"

    # Above content
    Then the page title should be "Department of Trees"
    And the breadcrumbs should not exist
    And the hero banner title should be "Department of Trees"
    And the hero banner should have the following links:
      | title           | href        |
      | All about trees | /trees      |
      | Contact us      | /contact-us |
    # Site Menu
    Then the site header is visible
    And the menu should have 2 top level items
    And the search button in the site header should have the text "Search"

    # Header components
    And the campaign primary banner component should exist
    And the "rpl-campaign-primary" component should contain "How good are trees?"
    And the "rpl-campaign-primary" component should contain "Bloody great they are!"

    # Background color
    And the body background color should be "grey"


  Scenario: On load - mobile
    Given the mock server has started
    And I am using a "iphone-8" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200 
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/&site=4" returns fixture "landing-page/homepage" with status 200 
    When I visit the page "/"  
    Then the search button text in the site header should not be visible