Feature: Grant page

  Example of mocked page

  Background:
    And the endpoint "/api/tide/page" with query "?path=/tc-9a-grant-simple-test-date-range&site=8888" returns fixture "/grant/tc-9a-grant-simple-test-date-range" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    Given I visit the page "/tc-9a-grant-simple-test-date-range"
    Then the title should be "TC-9a Grant Simple Test - Date Range"

  Example: Overview
    Then the overview should display a status of "Closed" with a "red" "cancel" icon
    And the overview should display funding of "$11,326 - $26,494"

  Example: Timeline
    Then the first timeline item should have a date of "01 January"

  Example: Guidelines
    When I click the open all button on accordion with ID "bc20d770-8a49-427c-a9eb-80d10dc06b51"
    Then all accordion items in accordion ID "bc20d770-8a49-427c-a9eb-80d10dc06b51" should be visible

  Example: Documents
    Then the first document should have a title of "Demo Sample Document", and filesize of "7.53 KB"
