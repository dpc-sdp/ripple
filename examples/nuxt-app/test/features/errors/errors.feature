Feature: Error pages

  As a site user I can see relevant error pages displayed.

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: 404
    Given I visit the page "/404"
    And the error page "/404" has a status of 404
    And the error page displays the title "Oops!"

  Example: 500
    Given I visit the page "/500"
    And the error page "/500" has a status of 500
    And the error page displays the title "Sorry!"
