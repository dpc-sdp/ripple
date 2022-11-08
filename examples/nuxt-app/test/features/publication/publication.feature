Feature: Publication page

  Example of mocked page

  Background:
    And the endpoint "/api/tide/page" with query "?path=/sample-publication&site=8888" returns fixture "/publication/sample-publication" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    Given I visit the page "/sample-publication"
    Then the title should be "Demo Publication"
