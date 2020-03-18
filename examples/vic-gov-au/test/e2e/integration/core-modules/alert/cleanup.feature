Feature: Global Notifications (Alert) - Cleanup

  Needed to cleanup alerts from polluting tests

  Scenario: BE - Cleanup
    Given I have logged into the backend
    And in the backend there are no "alert" nodes