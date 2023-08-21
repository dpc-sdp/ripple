Feature: Publication page page

  Example of mocked page

  Background:
    Given the page endpoint for path "/demo-publication/demo-publication-chapter-1" returns fixture "/publication-page/sample-publication-page" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=11dede11-10c0-111e1-1100-000000000500" returns fixture "/publication/sample-index" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    When I visit the page "/demo-publication/demo-publication-chapter-1"
    Then the title should be "Demo Publication - Chapter 1"
