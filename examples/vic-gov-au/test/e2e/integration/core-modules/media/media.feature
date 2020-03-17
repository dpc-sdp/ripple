Feature: Embedded Media

  As a citizen I am able to view videos published to the website
  
  Scenario: BE - Create media
    Given I have logged into the backend
    And in the backend there is a node at "/embedded-video-test" with "media/embedded-video-test" data
    And in the backend there is a node with "media/embedded-video" data as "embeddedVideoId"
    And in the backend there is a node with "media/embedded-video-no-transcript" data as "embeddedVideoNoTranscriptId"
    And I add a path alias "/test-embedded-video" for "embeddedVideoId"
    And I add a path alias "/test-embedded-video-no-transcript" for "embeddedVideoNoTranscriptId"

  Scenario: Landing page with Embedded media video
    When I visit the page "/embedded-video-test"
    Then the page design should match the snapshot
    Then there should be 2 embedded videos
    And there should be a embedded video transcript link "/media/7008"

  Scenario: Media page for video with transcript
    When I attempt to visit the page "/test-embedded-video"
    Then the current page should not be an error page
    And the page title should be "Demo: Wodonga Local Aboriginal Network - Bringing People Together"
    And the hero banner title should be "Demo: Wodonga Local Aboriginal Network - Bringing People Together"
    And there should be 2 breadcrumb items
    And there should be 1 embedded videos
    And the embedded video transcript should contain the text "this is the transcript"

  Scenario: Media page for video without transcript
    When I attempt to visit the page "/test-embedded-video-no-transcript"
    Then the current page should not be an error page
    And the page title should be "Embedded video test - no transcript"
    And the hero banner title should be "Embedded video test - no transcript"
    And there should be 2 breadcrumb items
    And there should be 1 embedded videos

