Feature: Shared site elements

  As a user I can view and interact with shared elements such as the primary nav and footer.

  @mockserver
  Scenario: Page title
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the page title should be "Demo Landing Page | vic.gov.au"

  @mockserver
  Scenario: Quick Exit (default: disabled site wide)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the quick exit should not be displayed

  @mockserver
  Scenario: Quick Exit (enabled site wide)
    Given I load the site fixture with "/site/shared-elements"
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    And the site wide quick exit is enabled
    And the site endpoint returns the loaded fixture
    Given I visit the page "/"
    Then the quick exit should be displayed

  @mockserver
  Scenario: Quick Exit (disabled site wide, enabled in site section)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And I load the page fixture with "/landingpage/home"
    And the site section quick exit is enabled
    And the page endpoint for path "/section-page" returns the loaded fixture
    Given I visit the page "/section-page"
    Then the quick exit should be displayed

  @mockserver
  Scenario: Quick Exit (enabled site wide, disabled in site section)
    Given I load the site fixture with "/site/shared-elements"
    And the site wide quick exit is enabled
    And the site endpoint returns the loaded fixture
    Given I load the page fixture with "/landingpage/home"
    And the site section quick exit is disabled
    And the page endpoint for path "/section-page" returns the loaded fixture
    Given I visit the page "/section-page"
    Then the quick exit should not be displayed

  @mockserver
  Scenario: Quick Exit (enabled site wide, inherited in site section)
    Given I load the site fixture with "/site/shared-elements"
    And the site wide quick exit is enabled
    And the site endpoint returns the loaded fixture
    Given I load the page fixture with "/landingpage/home"
    And the site section quick exit is inherited
    And the page endpoint for path "/section-page" returns the loaded fixture
    Given I visit the page "/section-page"
    Then the quick exit should be displayed

  @mockserver
  Scenario: Breadcrumbs (page exists in menu)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/level-3-item-2" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/level-3-item-2"
    Then the breadcrumbs should have the following items
      | text             | url             |
      | Home             | /               |
      | Level 1 - Item 1 | /level-1-item-1 |
      | Level 2 - Item 1 | /level-2-item-1 |
      | Level 3 - Item 2 |                 |

  @mockserver
  Scenario: Breadcrumbs (page does not exists in menu)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/some-random-page" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/some-random-page"
    Then the breadcrumbs should have the following items
      | text              | url |
      | Home              | /   |
      | Demo Landing Page |     |


  @mockserver
  Scenario: Breadcrumbs (root page)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the breadcrumbs should not exist

  @mockserver
  Scenario: Last updated date
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/some-random-page" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/some-random-page"

    Then the last updated date text should read "Updated 2 November 2022"

  @mockserver
  Scenario: Topics and tags
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/some-random-page" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/some-random-page"

    Then the page should have the following topic tags
      | text             | url                    |
      | Demo Topic       | /topic/demo-topic      |
      | Demo Tag         | /tags/demo-tag         |
      | Another Demo Tag | /tags/another-demo-tag |

  @mockserver
  Scenario: Content Rating (visible)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And I load the page fixture with "/landingpage/home"
    And the content rating form is enabled
    Then the page endpoint for path "/page" returns the loaded fixture

    Given I visit the page "/page"
    Then the content rating form should be displayed
    And I click the content rating option labelled "Yes"
    Then the content rating form should display the custom text "Test custom rating text."

  @mockserver
  Scenario: Content Rating (hidden)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And I load the page fixture with "/landingpage/home"
    And the content rating form is disabled
    Then the page endpoint for path "/page" returns the loaded fixture

    Given I visit the page "/page"
    Then the content rating form should not be displayed

  @mockserver
  Scenario: Footer
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/some-random-page" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/some-random-page"

    Then the footer nav section with title "Level 1 - Item 1" should link to "/level-1-item-1"
    And the footer nav section with title "Level 1 - Item 1" should have the following links
      | text             | url             |
      | Level 2 - Item 1 | /level-2-item-1 |
      | Level 2 - Item 2 | /level-2-item-2 |
    Then the footer nav section with title "Level 1 - Item 2" should link to "/level-1-item-2"
    Then the footer nav section with title "Connect with us" should have the following links
      | text     | url                       |
      | Facebook | https://www.facebook.com/ |
      | LinkedIn | https://www.linkedin.com/ |
    Then the footer should have the following links
      | text          | url            |
      | Footer link 1 | /footer-link-1 |
      | Footer link 2 | /footer-link-2 |
    Then the footer copyright text should be "Test footer copyright html"
    Then the footer acknowledgement text should be "Test footer acknowledgement"
    Then the footer should have the following logos
      | alt         | url          | src                    |
      | Test logo 1 | /test-logo-1 | /placeholders/logo.png |
      | Test logo 2 | /test-logo-2 | /placeholders/logo.png |

  @mockserver
  Scenario: Footer (Mobile)
    Given the site endpoint returns fixture "/site/shared-elements" with status 200
    And the page endpoint for path "/some-random-page" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/some-random-page"
    And I am using a "iphone-x" device

    When I open the footer nav section with title "Level 1 - Item 1"
    Then the footer nav section with title "Level 1 - Item 1" should have the following links
      | text             | url             |
      | Level 1 - Item 1 | /level-1-item-1 |
      | Level 2 - Item 1 | /level-2-item-1 |
      | Level 2 - Item 2 | /level-2-item-2 |

    When I open the footer nav section with title "Level 1 - Item 1"
    Then the footer nav section with title "Level 1 - Item 2" should have the following links
      | text             | url             |
      | Level 1 - Item 2 | /level-1-item-2 |
