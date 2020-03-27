Feature: Topics and Tags Search Page

  As a Citizen I can explore results on the site for a given tag/topic so that I can navigate to the related content I want to read
  
  Scenario: View tag search results
    When I visit the page "/tags/aboriginal-victorians"
    Then the page title should be "Tags - Aboriginal Victorians"
    And the h1 should be "Aboriginal Victorians"
    And the search results component should exist
    And the content rating component should exist

  Scenario: View topic search results
    When I visit the page "/topic/arts-culture-and-heritage"
    Then the page title should be "Topic - Arts, culture and heritage"
    And the h1 should be "Arts, culture and heritage"
    And the search results component should exist
    And the content rating component should exist