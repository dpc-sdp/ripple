Feature: RTL complete page

  Example of mocked page
  Background:
    Given the page endpoint for path "/rtl" returns fixture "/rtl/page" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    Given I visit the page "/rtl"

  @mockserver
  Scenario: RTL page renders non-text elements correctly
    Then the section ".rpl-header" should be display "rtl" in "fa" with the font "Noto Naskh Arabic"
    And the section "#rpl-main" should be display "rtl" in "fa" with the font "Noto Naskh Arabic"
