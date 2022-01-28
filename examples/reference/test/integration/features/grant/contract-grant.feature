Feature: Tide Grant API

  Grant page API response should match schema

  @contract
  Scenario: Sample grant page matches schema
    Given a request is made to "/tide-api/v2/page?path=/tc-9b-grant-page-closed&site=4"
    Then the response code should be 200
    And the response should match Swagger definition
