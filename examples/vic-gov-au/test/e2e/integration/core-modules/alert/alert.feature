Feature: Global Notifications (Alert)

  As a citizen I need to be alerted to important site wide notifications.
  
  Background: Cleanup alerts
    # Given there are no alerts in the system

  @skip
  Scenario: 1-FE-Alert-1 Displays global alert
    Given I have created a node with the YAML fixture "/alert/1-BE-Alert-1"
    When I visit the page "/"
    Then I should see 1 global notification
    And there should be the following global notifications:
      | title        | type      | link                   | linkText    |
      | 1-FE-Alert-1 | Heat Wave | http://www.ghoogle.com | Google link |
  
  @skip
  Scenario: 1-FE-Alert-2 Displays site section alert
    Given I have created a node with the YAML fixture "/alert/1-BE-Alert-2"
    When I visit the page "/"
    And I visit the page "/first-home-buyers-checklist"
    Then I should see 1 global notification
    And there should be the following global notifications:
      | title        | type      | link                   | linkText    |
      | 1-FE-Alert-2 | Heat Wave | http://www.ghoogle.com | Google link |
  
  @skip
  Scenario: 1-FE-Alert-2 Displays site section alert
    When I visit the page "/"
    Given I have created a node with the YAML fixture "/alert/1-BE-Alert-3"
    And I wait for 60 seconds
    And I visit the page "/first-home-buyers-checklist"
    Then I should see 1 global notification
    And there should be the following global notifications:
      | title        | type      | link                   | linkText    |
      | 1-FE-Alert-3 | Flood     | http://www.ghoogle.com | Google link |

