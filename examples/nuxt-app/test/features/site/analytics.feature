Feature: Analytics

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: DataLayer events
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"

    Then the dataLayer should include the following events
      | event       | page_title        | page_url | content_type |
      | routeChange | Demo Landing Page | /        | landing_page |
