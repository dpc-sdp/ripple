Feature: Sitemap

  As a user I can visit the sitemap and see the whole site navigation on one page.

  @mockserver
  Scenario: Visit sitemap
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    Given I visit the page "/sitemap"
    Then the sitemap should be rendered with these items
      | text             |
      | Level 1 - Item 1 |
      | Level 2 - Item 1 |
      | Level 3 - Item 1 |
      | Level 3 - Item 2 |
      | Level 2 - Item 2 |
      | Level 1 - Item 2 |

