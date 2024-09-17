Feature: Analytics

  @mockserver
  Scenario: DataLayer - page view
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the dataLayer should include the following events
      | event       | page_title        | page_url | content_type | content_status |
      | routeChange | Demo Landing Page | /        | landing_page | published      |

  @mockserver
  Scenario: DataLayer - breadcrumbs
    Given the site endpoint returns fixture "/site/vic" with status 200
    And the page endpoint for path "/education" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/education"
    Then the dataLayer should have the following breadcrumbs
      | title                    |
      | Information and services |
      | Education                |
