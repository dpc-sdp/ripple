Feature: Sidebar

  Example of mocked page
  Background:
    Given the page endpoint for path "/sub" returns fixture "/landingpage/sub" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/sub"

  @mockserver
  Scenario: Sidebar components
    Then the sidebar component with ID "26146cba-f307-449e-885c-7446efb3f315" should exist
    Then the sidebar component with ID "tide-sidebar-social-share" should exist
    Then the sidebar component with ID "tide-sidebar-related-links" should exist
