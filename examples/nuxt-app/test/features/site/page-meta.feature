Feature: Page meta

  @mockserver
  Scenario: Image loading
    Given the site endpoint returns fixture "/site/reference" with status 200
    Given the page endpoint for path "/" returns fixture "/landingpage/image-banner" with status 200
    When I visit the page "/"
    And all content images should be "lazy" loaded
    And the hero image should be "eager" loaded

  @mockserver
  Scenario: Page meta data is set correctly for pages
    Given the site endpoint returns fixture "/site/reference" with status 200
    Given the page endpoint for path "/page-meta" returns fixture "/landingpage/meta" with status 200
    When I visit the page "/page-meta?gtm=101"
    Then the following meta tags should exists
      | type | key                      | value                                                                        |
      | link | rel::canonical           | href::https://test.url/page-meta                                             |
      | meta | name::description        | content::Custom page description                                             |
      | meta | property::og:title       | content::Custom page title                                                   |
      | meta | property::og:site_name   | content::Custom site name                                                    |
      | meta | property::og:description | content::Custom page description                                             |
      | meta | property::og:url         | content::https://test.url/page-meta                                          |
      | meta | property::og:image       | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |
      | meta | name::twitter:image      | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |
      | meta | name::original-source    | content::http://police.vic.gov.au/some-page                                  |
      | meta | name::keywords           | content::meta, quality                                                       |
      | meta | name::robots             | content::noindex                                                             |

  @mockserver
  Scenario: Page meta data is set correctly for the home page
    Given the site endpoint returns fixture "/site/reference" with status 200
    Given the page endpoint for path "/" returns fixture "/landingpage/meta" with status 200
    When I visit the page "/"
    Then the following meta tags should exists
      | type | key                   | value                                                                        |
      | link | rel::canonical        | href::https://test.url/                                                      |
      | meta | property::og:url      | content::https://test.url/                                                   |
      | meta | property::og:image    | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |
      | meta | name::twitter:image   | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |

  @mockserver
  Scenario: Page meta data is set correctly for the page that is set as the home page but accessed directly
    Given I load the site fixture with "/site/reference"
    And the site home page is set to "92ac9f92-0fzcw-4145-bb30-c3im7s2184x"
    And the site endpoint returns the loaded fixture
    And the page endpoint for path "/home-original" returns fixture "/landingpage/meta-home-original" with status 200

    When I visit the page "/home-original"
    Then the following meta tags should exists
      | type | key                   | value                                                                        |
      | link | rel::canonical        | href::https://test.url/                                                      |
      | meta | property::og:url      | content::https://test.url/                                                   |
      | meta | property::og:image    | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |
      | meta | name::twitter:image   | content::https://test.url/sites/default/files/tide_demo_content/an-image.jpg |
