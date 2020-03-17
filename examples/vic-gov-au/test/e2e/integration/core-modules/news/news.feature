Feature: News page

  As a citizen I need to be able to read view news articles
  
  Scenario: BE - Creating a news page
    Given I have logged into the backend
    And in the backend there is a node at "/test-news-page" with "news/news-1" data
    And in the backend there is a node at "/test-news-page-2" with "news/news-2" data
  
  Scenario: FE - News page
    Given I visit the page "/test-news-page-1"
    Then the page design should match the snapshot
    Then the page title should be "Test news page"
    And the h1 should be "Test news page"
    And there should be 2 breadcrumb items
    And the hero banner title should be "Test news page"
    And the hero banner desciption should be "Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae"
    And the publish date and author component should exist
    And the publish date and location should read "02/07/19 9.00am"
    And the publish author should be "Published by Demo Department"
    And the content rating component should exist
    And the related links component should exist
    And the content rating component should exist
