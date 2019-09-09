Feature: Test Tide backend is up

  Integration test to make sure that the tide backend is returning the correct API endpoints

  @smoke
  Scenario: Route endpoint returns a correct response
    Given a request is made to "/api/v1/route?site=4&path=/"
    Then the response code should be 200

  @smoke
  Scenario: Sites endpoint returns a correct response
    Given a request is made to "/api/v1/taxonomy_term/sites?site=4"
    Then the response code should be 200

  @smoke
  Scenario: Alert endpoint returns a correct response
    Given a request is made to "/api/v1/node/alert?site=4&include=field_alert_type"
    Then the response code should be 200