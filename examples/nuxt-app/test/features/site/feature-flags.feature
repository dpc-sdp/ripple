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

  @mockserver
  Scenario: The default site section nav toggles one level and displays all children
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site section nav should display the following
      | text              | link                                          |
      | Demo Landing Page |                                               |
      | Events            |                                               |
      | News              |                                               |
      | Publications      | /17-be-pub-page-1-child-page-chapter-1-page-1 |
    And clicking the site section nav item "Demo Landing Page" shows the following
      | text                        | link                |
      | Demo Landing Page           | /demo-landing-page  |
      | 2.1 Accessibility - demo    | /accessibility-demo |
      | 2.2 Copyright - demo        | /copyright-demo     |
      | 2.3 Disclaimer - demo       | /disclaimer-demo    |
      | 3.1 Find and connect - demo | /find-connect-demo  |
      | 4.1 Many Talents - demo     | /many-talents-demo  |

  @mockserver
  Scenario: Feature flags can set the site section nav to use toggle-able children
    Given I load the site fixture with "/site/reference"
    And the feature flag "sectionNavToggleLevels" is set to "3"
    And the site endpoint returns the loaded fixture
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the site section nav should display the following
      | text              | link                                          |
      | Demo Landing Page |                                               |
      | Events            |                                               |
      | News              |                                               |
      | Publications      | /17-be-pub-page-1-child-page-chapter-1-page-1 |
    And clicking the site section nav item "Demo Landing Page" shows the following
      | text                          | link                |
      | Demo Landing Page             | /demo-landing-page  |
      | 2.1 Accessibility - demo      | /accessibility-demo |
      | 2.2 Copyright - demo          | /copyright-demo     |
      | 2.3 Disclaimer - demo         |                     |
      | 2.4 Working in the CMS - demo | /working-cms-demo   |
    Then clicking the site section nav item "2.3 Disclaimer - demo" shows the following
      | text                        | link              |
      | 2.3 Disclaimer - demo       | /disclaimer-demo  |
      | 3.1 Find and connect - demo |                   |
      | 3.2 Legal notes - demo      | /legal-notes-demo |
    Then clicking the site section nav item "3.1 Find and connect - demo" shows the following
      | text                        | link               |
      | 3.1 Find and connect - demo | /find-connect-demo |
      | 4.1 Many Talents - demo     | /many-talents-demo |
      | 5.1 Another menu - demo     | /another-demo      |
      | 4.2 More Talents - demo     | /more-talents-demo |
