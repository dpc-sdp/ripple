Feature: Site section navigation

  Example of the site section navigation in the landing page sidebar

  Background:
    Given the page endpoint for path "/level-2-2" returns fixture "/landingpage/site-section-nav" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: Nested item active
    When I visit the page "/level-2-2"
    Then the site section nav should contain the following level 1 items:
      | text        | url        |
      | Level 1 - 1 | /level-1-1 |
      | Level 1 - 2 | /level-1-2 |

    Then the site section nav item with label "Level 1 - 1" should be expanded
    Then the site section nav item with label "Level 1 - 2" should be collapsed

    Then the site section nav item with label "Level 1 - 1" should be inactive
    Then the site section nav item with label "Level 2 - 2" should be active
