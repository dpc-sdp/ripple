Feature: App headers

  As a DevOps Engineer I can rely on headers in the App to distinguish between routes that should go to the Backend API vs the FE App so that I can optimise the CDN.

  @smoke
  Scenario: There are expected Ripple app response headers
    Given a request is made to "/"
    And the response header "x-sdp-app-type" should has value "ripple"
    And the response has header "section-cache-tags"
  
  @smoke
  Scenario: There are expected Tide API response headers
    Given a request is made to "/api/v1/route?site=4&path=/"
    And the response header "x-sdp-app-type" should has value "tide"
