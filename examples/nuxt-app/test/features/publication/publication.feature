Feature: Publication page

  Example of mocked page

  Background:
    Given the page endpoint for path "/victorian-skills-plan-2023-implementation-update" returns fixture "/publication/sample-publication" with status 200
    And the page endpoint for path "/victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives" returns fixture "/publication/sample-publication-page" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index" with status 200
    And the site endpoint returns fixture "/site/vic" with status 200

  @mockserver
  Example: Publication parent
    When I visit the page "/victorian-skills-plan-2023-implementation-update"
    Then the title should be "Victorian Skills Plan Implementation Update"

  @mockserver
  Example: Publication child
    When I visit the page "/victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives"
    Then the title should be "The Victorian Skills Plan 2022 into 2023 actions and initiatives"
    And there should be a page link with a title of "Previous" and description text of "Victorian Skills Plan Implementation Update"
    And there should be a page link with a title of "Next" and description text of "Promoting post-secondary education skills and career pathways"
