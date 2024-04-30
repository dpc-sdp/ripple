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

  @mockserver
  Scenario: Feature flags can set the footer to show only a single level
    Given the site endpoint returns fixture "/site/flags-footer-single" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    Then the footer nav should have the following single level items
      | text   | url     |
      | Events | /events |
      | News   | /news   |
    And the footer nav section with title "Connect with us" should have the following links
      | text     | url                           |
      | Facebook | https://facebook.com/VicGovAu |
      | Twitter  | https://twitter.com/VicGovAu  |

  @mockserver
  Scenario: The default primary nav form navigates to /search
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    When I click the primary nav button labelled "Search"
    And I submit the primary nav search form
    Then the current path should be "/search"

  @mockserver
  Scenario: Feature flags can set the primary nav search URL
    Given I load the site fixture with "/site/reference"
    And the feature flag "primaryNavSearchUrl" is set to "/custom-search-results"
    And the site endpoint returns the loaded fixture
    And the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    And the page endpoint for path "/custom-search-results" returns fixture "/landingpage/image-banner" with status 200
    Given I visit the page "/"
    When I click the primary nav button labelled "Search"
    And I submit the primary nav search form
    Then the current path should be "/custom-search-results"
