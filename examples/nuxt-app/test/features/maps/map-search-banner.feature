Feature: Map search banner

  Build test

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Example: Map search banner (desktop)
    Given the page endpoint for path "/map" returns fixture "/maps/example-map-search-banner" with status 200
    And I am using a "macbook-16" device
    Then I visit the page "/map"

  @mockserver
  Example: Map search banner (mobile)
    Given the page endpoint for path "/map" returns fixture "/maps/example-map-search-banner" with status 200
    And I am using a "iphone-x" device
    Then I visit the page "/map"
