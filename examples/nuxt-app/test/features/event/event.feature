Feature: Event page

  Example of mocked page

  Example: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/sample-event&site=8888" returns fixture "/event/sample-event" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/sample-event"
    Then the title should be "Sample Event"
