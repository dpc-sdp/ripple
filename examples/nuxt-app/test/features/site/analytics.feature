Feature: Analytics

  Background:
    Given I am using a "macbook-16" device

  @mockserver
  Scenario: Page view
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the dataLayer should include the following events
      | event       | page_title        | page_url | content_type |
      | routeChange | Demo Landing Page | /        | landing_page |

  @mockserver
  Scenario: Breadcrumbs
    Given the site endpoint returns fixture "/site/vic" with status 200
    And the page endpoint for path "/education" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/education"
    Then the dataLayer should have the following breadcrumbs
      | title                    |
      | Information and services |
      | Education                |

  @mockserver
  Scenario: Back to top
    Given the site endpoint returns fixture "/site/vic" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then I scroll 1900 pixels
    And I click the back to top button
    Then the dataLayer back to top event should have a value of 25
