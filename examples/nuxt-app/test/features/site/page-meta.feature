Feature: Page meta

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: Image loading
    Given the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    When I visit the page "/"
    And all content images should be "lazy" loaded
    And the hero image should be "eager" loaded
