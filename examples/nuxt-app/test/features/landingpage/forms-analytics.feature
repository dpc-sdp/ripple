Feature: Forms analytics events

  @mockserver
  Scenario: Form start
    Given the mock server has started
    And the page endpoint for path "/" returns fixture "/landingpage/full-form" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/"
    When I type "Cat" into the input with the label "Last name"
    When I blur the input with the label "Last name"
    Then the dataLayer should include the following events
      | event      | form_id   | form_name | component | platform_event |
      | form_start | full_form | Test form | rpl-form  | start          |
