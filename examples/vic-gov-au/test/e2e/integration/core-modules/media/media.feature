Feature: Media

  Test Media
  
  Scenario: Embedded media video
    Given the "/embedded-video-test" page exists with fixture "media/embedded-video-test" data
    When I visit the page "/embedded-video-test"
    Then there should be 2 embedded videos
    And there should be a embedded video transcript link
