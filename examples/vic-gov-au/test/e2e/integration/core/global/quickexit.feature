Feature: Quick exit

  As a citizen in a potentially dangerous situation I need to be able to 
  quickly remove the content on my screen if another person walks into the room.
  
  Scenario: BE - Enable quick exit
    Given I have logged into the backend
    And in the BE I go to the current site taxonomy page
    And in the BE I check the "Show Exit Site?" checkbox
    And in the BE I click the "Save" button

  Scenario: FE - Check quick exit exists on page
    When I attempt to visit the page "/"
    Then the quick exit button should be present
    And the quick exit url should be "www.google.com"