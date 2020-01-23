Feature: Embedded Media

  As a citizen I am able to view videos published to the website
  
  Scenario: Landing page with Embedded media video
    Given the "/embedded-video-test" page exists with fixture "media/embedded-video-test" data
    When I visit the page "/embedded-video-test"
    Then there should be 2 embedded videos
    And there should be a embedded video transcript link "/media/7008"

  Scenario: Media page for video with transcript
    Given I have created a node with the YAML fixture "media/embedded-video"
    When I navigate to the first created node
    Then the current page should not be an error page
    And the page title should be "Demo: Wodonga Local Aboriginal Network - Bringing People Together"
    And the hero banner title should be "Demo: Wodonga Local Aboriginal Network - Bringing People Together"
    And there should be 2 breadcrumb items
    And there should be 1 embedded videos
    And the embedded video transcript should contain the text "this is the transcript"

  Scenario: Media page for video without transcript
    Given I have created a node with the YAML fixture "media/embedded-video-no-transcript"
    When I navigate to the first created node
    Then the current page should not be an error page
    And the page title should be "Embedded video test - no transcript"
    And the hero banner title should be "Embedded video test - no transcript"
    And there should be 2 breadcrumb items
    And there should be 1 embedded videos

