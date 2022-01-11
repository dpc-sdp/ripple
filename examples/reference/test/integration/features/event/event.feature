Feature: Event page

  As a citizen I want to see information about an event

  Scenario: Basic example
    Given the mock server has started
    And I am using a "macbook-13" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200 
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/basic-example-event&site=4" returns fixture "landing-page/homepage" with status 200 
    When I visit the page "/basic-example-event"
