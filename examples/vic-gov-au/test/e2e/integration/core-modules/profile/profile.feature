Feature: Profile page

  As a citizen I want to be able to see information about inductees in the honour roll.
  
  Scenario: Profile page
    Given the "/profile-4-be-profile-1" page exists with fixture "profile/4-BE-Profile-1" data
    When I visit the page "/profile-4-be-profile-1"
    Then the page title should be "Profile-4-BE-profile-1"
    And the h1 should be "Profile-4-BE-profile-1"
    And there should be a honour roll profile image containing url "tram.jpg"
    And there should be a description list with the following items: 
      | term                   | value                |
      | Inducted               | 2017                 | 
      | Category               | Trailblazer          |
    And the order number 1 wysiwyg content contains fixture "profile/4-BE-Profile-1.html"