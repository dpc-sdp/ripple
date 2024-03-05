Feature: Site feature flags

  As a site admin I generic feature flags to be used across the site

  @mockserver
  Scenario: Default social share links are respected
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    Then the sidebar component with ID "tide-sidebar-social-share" should exist
    And the sidebar social share links should display as follows
      | link                 | visible |
      | Facebook             | true    |
      | LinkedIn             | true    |
      | X (formerly Twitter) | true    |
      | WhatsApp             | false   |
      | Email                | false   |

  @mockserver
  Scenario: Feature flags can manage social share links
    Given the site endpoint returns fixture "/site/flags-social-share" with status 200
    And the page endpoint for path "/share-page" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/share-page"
    Then the sidebar component with ID "tide-sidebar-social-share" should exist
    And the sidebar social share links should display as follows
      | link                 | visible |
      | Facebook             | false   |
      | LinkedIn             | false   |
      | X (formerly Twitter) | false   |
      | WhatsApp             | true    |
      | Email                | true    |
    And the sidebar social share email link should contain
      | key     | value                                                    |
      | subject | Check out Demo Landing Page                              |
      | body    | I thought you might like this article Demo Landing Page. |
