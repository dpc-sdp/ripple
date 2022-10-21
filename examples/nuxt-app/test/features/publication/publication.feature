Feature: Publication page

  Example of mocked page

  Example: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/sample-publication&site=8888" returns fixture "/publication/sample-publication" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/sample-publication"
    Then the title should be "Sample Publication"
