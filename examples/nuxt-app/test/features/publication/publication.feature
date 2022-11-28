Feature: Publication page

  Example of mocked page

  Background:
    And the endpoint "/api/tide/page" with query "?path=/sample-publication&site=8888" returns fixture "/publication/sample-publication" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=11dede11-10c0-111e1-1100-000000000500" returns fixture "/publication/sample-index" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    Given I visit the page "/sample-publication"
    Then the title should be "Demo Publication"
