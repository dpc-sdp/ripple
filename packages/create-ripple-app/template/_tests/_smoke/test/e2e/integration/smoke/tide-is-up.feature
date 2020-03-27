Feature: Test Tide backend is up

  Integration test to make sure that the tide backend is returning the correct API endpoints

  @smoke
  Scenario: Route endpoint returns a correct response
    Given a request is made to "/api/v1/route?site=<%= siteid %>&path=/"
    Then the response code should be 200

  @smoke
  Scenario: Sites endpoint returns a correct response
    Given a request is made to "/api/v1/taxonomy_term/sites?site=<%= siteid %>"
    Then the response code should be 200

  @smoke
  Scenario: Alert endpoint returns a correct response
    Given a request is made to "/api/v1/node/alert?site=<%= siteid %>&include=field_alert_type"
    Then the response code should be 200