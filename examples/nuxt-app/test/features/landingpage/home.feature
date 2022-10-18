Feature: Home page

  Example of mocked page

  Scenario: On 404
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/404&site=8888" returns fixture "/errors/404" with status 404
    Given I visit the page "/404"

  Scenario: On load
    Given the mock server has started
    And the endpoint "/api/tide/page" with query "?path=/&site=8888" returns fixture "/landingpage/home" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    Given I visit the page "/"
    Then the landing page component "RplContent" should exist
    Then the landing page component with ID 678 should exist
    Then the landing page component with ID 682 should exist
    Then the sidebar component with ID "CONTACT_US" should exist
    Then the sidebar component with ID "tide-sidebar-related-links" should exist
    Then the sidebar component with ID "tide-sidebar-social-share" should exist
    When I click the open all button on RplAccordion with ID "682"
    Then all accordion items in accordion ID "682" should be visible
