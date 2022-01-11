Feature: Tide Landing Page API

  Tide Landing page API response should match schema
  
  @contract
  Scenario: Homepage matches schema
    Given a request is made to "/tide-api/v2/page?path=/&site=4"
    Then the response code should be 200
    And the response should match Swagger definition

  @contract
  Scenario: Kitchen sink matches schema
    Given a request is made to "/tide-api/v2/page?path=/testing-page-analytics&site=4"
    Then the response code should be 200
    And the response should match Swagger definition
