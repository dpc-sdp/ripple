Feature: Sidebar

  Example of mocked page sidebar

  Background:
    Given the page endpoint for path "/sub" returns fixture "/landingpage/sub" with status 200
    And the page endpoint for path "/sub2" returns fixture "/landingpage/sub-faulty" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: Sidebar components
    When I visit the page "/sub"
    Then the sidebar component with ID "26146cba-f307-449e-885c-7446efb3f315" should exist
    Then the sidebar component with ID "tide-sidebar-social-share" should exist
    Then the sidebar component with ID "tide-sidebar-related-links" should exist

  This specific scenario tests the filter on incomplete related links

  @mockserver
  Scenario: Sidebar components
    When I visit the page "/sub2"
    Then the sidebar component with ID "tide-sidebar-related-links" should not exist
