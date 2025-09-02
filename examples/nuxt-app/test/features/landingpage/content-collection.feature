Feature: Content collection

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the page endpoint for path "/home" returns fixture "/landingpage/home" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/content-collection" with status 200

  @mockserver
  Scenario: Page component - Content collection - Cards
    Given the "/**/_search" network request is stubbed with fixture "/landingpage/content-collection-response-elasticsearch" and status 200 as alias "ccReq"
    When I visit the page "/home"
    # Need to render in the browser to properly mock the elasticsearch call
    When I click the primary nav logo
    Then the content collection with ID "2192" exist with the following cards
      | title          | content                              | image                    | url        | type       |
      | News for CC 01 | NP1 Etiam scelerisque lorem sit amet | /placeholders/medium.png | /news-cc-1 | promo-card |
      | News for CC 02 | NP2 Pellentesque a pharetra magna    |                          | /news-cc-2 | promo-card |

  @mockserver
  Scenario: Page component - Content collection - List
    Given the "/**/_search" network request is stubbed with fixture "/landingpage/content-collection-response-elasticsearch" and status 200 as alias "ccReq"
    When I visit the page "/home"
    Then I click the primary nav logo
    Then the content collection with ID "2193" exist with the following cards
      | title          | content                              | url        | type          |
      | News for CC 01 | NP1 Etiam scelerisque lorem sit amet | /news-cc-1 | search-result |
      | News for CC 02 | NP2 Pellentesque a pharetra magna    | /news-cc-2 | search-result |

  @mockserver
  Scenario: Page component - Content collection - Grants Cards
    Given the "/**/_search" network request is stubbed with fixture "/landingpage/content-collection-response-grants" and status 200 as alias "ccReq"
    When I visit the page "/home"
    Then I click the primary nav logo
    Then the content collection with ID "2194" exist with the following cards
      | title                                                 | content                                                   | meta                          | url                                                                         | type       |
      | TAV2: Grant Content Type - fixture                    | Test creation of Grant Content Type                       | Open, closes 20 December 2050 | /tav2-grant-content-type-fixture                                            | grant-card |
      | TC-9b Grant page - Closed                             | Lorem ipsum dolor sit amet                                | Closed                        | /tc-9b-grant-page-closed                                                    | grant-card |
      | Eligible Volunteers Rebate Scheme (Volunteers Rebate) | Eligible volunteers and life members can receive a rebate | Ongoing                       | /eligible-volunteers-rebate-scheme-volunteers-rebate                        | grant-card |
      | Build Better Homes                                    | Grants to deliver events for the construction industry    | Closed                        | https://www.solar.vic.gov.au/training-and-workforce-development-grants-open | grant-card |

  @mockserver
  Scenario: Page component - Content collection - Grants List
    Given the "/**/_search" network request is stubbed with fixture "/landingpage/content-collection-response-grants" and status 200 as alias "ccReq"
    When I visit the page "/home"
    Then I click the primary nav logo
    Then the content collection with ID "2195" exist with the following cards
      | title                                                 | content                                                   | meta                          | url                                                                         | type         |
      | TAV2: Grant Content Type - fixture                    | Test creation of Grant Content Type                       | Open, closes 20 December 2050 | /tav2-grant-content-type-fixture                                            | grant-result |
      | TC-9b Grant page - Closed                             | Lorem ipsum dolor sit amet                                | Closed                        | /tc-9b-grant-page-closed                                                    | grant-result |
      | Eligible Volunteers Rebate Scheme (Volunteers Rebate) | Eligible volunteers and life members can receive a rebate | Ongoing                       | /eligible-volunteers-rebate-scheme-volunteers-rebate                        | grant-result |
      | Build Better Homes                                    | Grants to deliver events for the construction industry    | Closed                        | https://www.solar.vic.gov.au/training-and-workforce-development-grants-open | grant-result |
