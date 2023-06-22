Feature: Error pages

  As a site user I can see relevant error pages displayed.

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: 500
    Given the endpoint "/api/tide/page" with query "?path=/500&site=8888" returns fixture "/errors/500" with status 500
    When I visit the page "/500"
    Then the error page "/500" has a status of 500
    And the error content contains the status 500

  @mockserver
  Example: 404
    Given the endpoint "/api/tide/page" with query "?path=/404&site=8888" returns fixture "/errors/404" with status 404
    When I visit the page "/404"
    Then the error page "/404" has a status of 404
    And the error content contains the status 404

