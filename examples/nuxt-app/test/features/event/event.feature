Feature: Event page

  Example of mocked page

  Background:
    Given the endpoint "/api/tide/page" with query "?path=/sample-event&site=8888" returns fixture "/event/sample-event" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    When I visit the page "/sample-event"
    Then the title should be "2-BE-event-1"

  Example: Details
    And the overview should list the following details
      | text                                 |
      | This venue is wheelchair accessible. |
      | This event is child-friendly.        |
