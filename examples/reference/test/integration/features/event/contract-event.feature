Feature: Tide Event Page API

  Tide Event page API response should match schema
  
  @contract
  Scenario: Homepage matches schema
    Given a request is made to "/tide-api/v2/page?path=/demo-event&site=4"
    Then the response code should be 200
    And the response should match Swagger definition

