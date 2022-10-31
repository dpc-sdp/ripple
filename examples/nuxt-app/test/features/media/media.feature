Feature: Media page

  Example of mocked page

  Example: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/media/36&site=8888" returns fixture "/media/36" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/media/36"
    Then the title should be "Demo: Embedded Video"

  Example: Video
    Then the media page should display content which includes "Video transcript content"
    And the media page should have the timestamp of "2022-10-26T01:06:33+00:00"
    And the media page should include a video embed with source "https://www.youtube.com/embed/YYrvm5zaAjk?autoplay=0&start=0&rel=0"

  Example: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/media/271&site=8888" returns fixture "/media/271" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/media/271"
    Then the title should be "Demo: Audio"

  Example: Audio
    Then the media page should display content which includes "Audio transcript content"
    And the media page should have the timestamp of "2022-08-22T01:06:00+00:00"
    And the media page should include a audio embed with source "#audio-source"
