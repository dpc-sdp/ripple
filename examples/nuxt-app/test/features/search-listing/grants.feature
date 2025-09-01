Feature: Grants collection

  As a user I can search for grants and filter them by status

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Results formatting
    Given the page endpoint for path "/grants" returns fixture "/search-listing/grants/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/grants"
    Then the search listing page should have 5 results
    And the search listing layout should be "list"
    And the search network request should be called with the "/search-listing/grants/request" fixture
    And the grant search listing results should have following items:
      | title                                    | url                                                                        | content                                                                                                                                               | audience                                         | amount            | status                    |
      | THIS IS A TEST                           | /tc-9b-grant-page-closed                                                   | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.    | Business                                         | $11,326 - $26,494 | Closed                    |
      | TC-9a Grant Simple Test - Date Range     | /tc-9a-grant-simple-test-date-range                                        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.    | Not-for-profit groups, government                | $11,326 - $26,494 | Open, closes 16 July 2050 |
      | 2023 Coastcare Victoria Community Grants | https://www.marineandcoasts.vic.gov.au/coastcare-victoria-community-grants | This year, Coastcare Victoria has $210,000 available for grants of up to $10,000 each. Projects will fit into one of three streams on offer including | Who can apply:Individuals, not-for-profit groups | $1 - $10,000      | Closed                    |
      | Opening soon test                        | /opening-soon-test                                                         | Supporting schools to build strong VCE Vocational Major and Victorian Pathways Certificate delivery                                                   | Government schools                               | $0 - $30,000      | Opens 16 April 2050       |
      | Youth Access Initiative                  | /youth-access-initiative                                                   | The Youth Access Initiative provides young people who have care and/or youth justice experience or who are residing in Education First Youth Foyers   | Individuals                                      |                   | Ongoing                   |

  @mockserver
  Example: Grant status filter - Open
    Given the page endpoint for path "/grants" returns fixture "/search-listing/grants/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/grants?status=open"
    Then the search listing page should have 5 results
    And the search network request should be called with the "/search-listing/grants/request-status-open" fixture

  @mockserver
  Example: Grant status filter - Closed
    Given the page endpoint for path "/grants" returns fixture "/search-listing/grants/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/grants?status=closed"
    Then the search listing page should have 5 results
    And the search network request should be called with the "/search-listing/grants/request-status-closed" fixture

  @mockserver
  Example: Grant status filter - Ongoing
    Given the page endpoint for path "/grants" returns fixture "/search-listing/grants/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/grants?status=ongoing"
    Then the search listing page should have 5 results
    And the search network request should be called with the "/search-listing/grants/request-status-ongoing" fixture

  @mockserver
  Example: Grant status filter - Opening soon
    Given the page endpoint for path "/grants" returns fixture "/search-listing/grants/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/grants/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"
    When I visit the page "/grants?status=opening_soon"
    Then the search listing page should have 5 results
    And the search network request should be called with the "/search-listing/grants/request-status-opening-soon" fixture
