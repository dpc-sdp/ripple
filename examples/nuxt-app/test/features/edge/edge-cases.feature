Feature: Edge case testing

  Specific content-based edge cases

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Accordion titles linked up to inpage nav
    Given the page endpoint for path "/accordions-inpage-nav" returns fixture "/case/accordions-inpage-nav" with status 200
    Then I visit the page "/accordions-inpage-nav"
    Then the in page nav should have the following items
      | text              | url                |
      | The first one     | #the-first-one     |
      | Another accordion | #another-accordion |
      | Basic text        | #basic-text        |
    When I click on the in page nav link "Another accordion"
    Then I should jump to the targeted section "Another accordion"
