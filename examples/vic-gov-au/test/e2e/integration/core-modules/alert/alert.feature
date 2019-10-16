Feature: Global Notifications (Alert)

  As a citizen I need to be alerted to important site wide notifications.
  
  Background: Cleanup alerts
    # Given there are no alerts in the system

  Scenario: 1-FE-Alert-1 Displays global alert
    Given I have created a node with the YAML fixture "alert/1-BE-Alert-1"
    When I visit the page "/"
    Then there should be the following global notifications:
      | title                   | type            | link                   | linkText     |
      | 1-BE-Alert-1 Demo Alert | Demo Alert Type | https://vic.gov.au     | More  details |
