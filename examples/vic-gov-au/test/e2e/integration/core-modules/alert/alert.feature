Feature: Global Notifications (Alert)

  As a citizen I need to be alerted to important site wide notifications.

  Scenario: BE - Add alerts
    Given I have logged into the backend
    And in the backend there are no "alert" nodes
    And in the backend there is a node at "/1-BE-Alert-1" with "alert/1-BE-Alert-1" data
    And in the backend there is a node at "/1-BE-Alert-2" with "alert/1-BE-Alert-2" data

  Scenario: FE - 1-FE-Alert-1 Displays global alert
    When I visit the page "/"
    And I wait for 5 seconds
    Then there should be the following global notifications:
      | title                   | type            | link                   | linkText      |
      | 1-BE-Alert-1 Demo Alert | Demo Alert Type | https://vic.gov.au     | More  details |
  
  Scenario: FE- 1-FE-Alert-2 Displays alert for site section
    When I visit the page "/housing-and-property"
    Then there should be the following global notifications:
      | title                   | type            | link                   | linkText      |
      | 1-BE-Alert-1 Demo Alert | Demo Alert Type | https://vic.gov.au     | More  details |
      | 1-BE-Alert-2 Demo Alert | Heat wave       | https://vic.gov.au     | More  details |
    When I visit the page "/housing-and-property"
    Then there should be the following global notifications:
      | title                   | type            | link                   | linkText      |
      | 1-BE-Alert-1 Demo Alert | Demo Alert Type | https://vic.gov.au     | More  details |