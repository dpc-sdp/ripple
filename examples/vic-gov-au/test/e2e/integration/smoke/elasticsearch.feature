Feature: Elasticsearch API

  Integration test to make sure that Elasticsearch is returning the correct API response

  @smoke
  Scenario: Search endpoint is up
    Given a request is made to the search endpoint with the following:
      | query     | page |
      | victoria  | 1    |
    Then the response code should be 200
    And the search request should have a valid response

  # @smoke
  # Scenario: Search index contains items
  #   Given a valid test request is made to the search endpoint
  #   Then the response code should be 200
  #   And the search response should return some hits