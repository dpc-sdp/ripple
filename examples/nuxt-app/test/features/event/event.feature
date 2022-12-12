Feature: Event page

  Example of mocked page

  Background:
    And the endpoint "/api/tide/page" with query "?path=/2-be-event-1&site=8888" returns fixture "/event/sample-event" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    Given I visit the page "/2-be-event-1"
    Then the title should be "2-BE-event-1"

  Example: Details
    Then the overview should list the following details
      | text                                 |
      | This event is wheelchair accessible. |
      | This event is child friendly.        |
