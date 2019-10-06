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
  
  # Demo content module has an issue creating alert without primary site - skip test until that is fixed
  # @skip 
  # Scenario: 1-FE-Alert-2 Displays site section alert
  #   Given I have created a node with the YAML fixture "alert/1-BE-Alert-2"
  #   When I visit the page "/"
  #   Then there should be the following global notifications:
  #     | title                   | type                | link                   | linkText      |
  #     | 1-BE-Alert-1 Demo Alert | Demo Alert Type     | https://vic.gov.au     | More  details |
  #   And I visit the page "/first-home-buyers-checklist"
  #   And there should be the following global notifications:
  #     | title                    | type               | link               | linkText           |
  #     | 1-BE-Alert-1 Demo Alert  | Demo Alert Type    | https://vic.gov.au | More  details      |
  #     | 1-BE-Alert-2 Demo Alert  | Heat Wave          | https://vic.gov.au | More  details      |
  #   When I visit the page "/"
  #   Then there should be the following global notifications:
  #     | title                   | type            | link                | linkText      |
  #     | 1-BE-Alert-1 Demo Alert | Demo Alert Type | https://vic.gov.au  | More  details |
  
  # Scenario: 1-FE-Alert-2 Displays site section alert
  #   When I visit the page "/"
  #   Given I have created a node with the YAML fixture "alert/1-BE-Alert-3"
  #   And I wait for 61 seconds
  #   And I visit the page "/demo-landing-page"
  #   Then I should see 2 global notification
  #   And there should be the following global notifications:
  #     | title                    | type            | link                   | linkText      |
  #     | 1-BE-Alert-1 Demo Alert  | Demo Alert Type | https://vic.gov.au     | More  details |
  #     | 1-BE-Alert-3 Demo Alert  | Flood           | https://vic.gov.au     | More  details |

