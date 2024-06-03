Feature: Edge case testing

  Specific content-based edge cases

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Accordion titles linked up to inpage nav
    Given the page endpoint for path "/accordions-inpage-nav" returns fixture "/case/accordions-inpage-nav" with status 200
    Then I visit the page "/accordions-inpage-nav"

  @mockserver
  Example: Multi-step form
    Given the page endpoint for path "/multi-step-webform" returns fixture "/case/multi-step-webform" with status 200
    Then I visit the page "/multi-step-webform"
