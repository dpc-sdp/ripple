Feature: Search listing - Filter

  As a user I can apply filters to my search

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Raw filter - Should reflect the value from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?rawFilter=Birds&rawFilter=Dogs"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-raw" fixture

    Then the filters toggle should show 1 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Raw filter example" should have the value "Dogs, Birds"

  @mockserver
  Example: Term filter - Should reflect a single value from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?termFilter=Green&singleTermFilter=Aqua&checkboxFilter=Archived"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-term-single" fixture

    Then the filters toggle should show 3 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Term filter example" should have the value "Green"
    And the search listing dropdown field labelled "Single term filter example" should have the value "Aqua"
    And the search listing checkbox field labelled "Show archived content" should be checked

  @mockserver
  Example: Term filter - Should reflect an array from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?termFilter=Green&termFilter=Red"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-term-array" fixture

    Then the filters toggle should show 1 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Term filter example" should have the value "Red, Green"

  @mockserver
  Example: Terms (with an 's') - Should reflect a single value from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?termsFilter=Purple"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-terms-single" fixture

    Then the filters toggle should show 1 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Purple"

  @mockserver
  Example: Terms (with an 's') - Should reflect an array from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?termsFilter=Purple&termsFilter=Orange"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-terms-array" fixture

    Then the filters toggle should show 1 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Orange, Purple"

  @mockserver
  Example: Custom function filters - Should reflect an array from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?functionFilter=closed&functionFilter=open"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-function-filter" fixture

    Then the filters toggle should show 1 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Custom function filter example" should have the value "Open, Closed"

  @mockserver
  Example: Custom fallback values - Should be included in the search query when not set
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page-fallback-values" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters?valueSet=orange"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-fallback-values" fixture

  @mockserver
  Example: Clear filters
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    And the current date is "Fri, 02 Feb 2050 03:04:05 GMT"

    When I visit the page "/filters?q=test123&page=2&functionFilter=open&termsFilter=Purple&termFilter=Green&rawFilter=Birds&checkboxFilter=Archived"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-clear-filled" fixture

    Then the filters toggle should show 5 applied filters
    Then the URL should reflect that the current page number is 2
    Then the URL should reflect that the current search term is "test123"

    When I toggle the search listing filters section
    Then the search input should have the value "test123"
    Then the URL should reflect that the current active filters are as follows:
      | id             | value    |
      | rawFilter      | Birds    |
      | termFilter     | Green    |
      | termsFilter    | Purple   |
      | functionFilter | open     |
      | checkboxFilter | Archived |

    Then the search listing dropdown field labelled "Raw filter example" should have the value "Birds"
    Then the search listing dropdown field labelled "Term filter example" should have the value "Green"
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Purple"
    Then the search listing dropdown field labelled "Custom function filter example" should have the value "Open"
    And the search listing checkbox field labelled "Show archived content" should be checked

    When I clear the search filters

    And the search network request should be called with the "/search-listing/filters/request-clear-empty" fixture
    Then the URL should reflect that the current page has been reset
    Then the URL should reflect that the current search term is ""
    Then the URL should reflect that the current active filters are as follows:
      | id             |
      | rawFilter      |
      | termFilter     |
      | termsFilter    |
      | functionFilter |
      | checkboxFilter |

    Then the search input should have the value ""
    Then the search listing dropdown field labelled "Raw filter example" should have the value "Select a pet"
    Then the search listing dropdown field labelled "Term filter example" should have the value "Select a colour"
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Select a colour"
    Then the search listing dropdown field labelled "Custom function filter example" should have the value "Select a status"
    And the search listing checkbox field labelled "Show archived content" should not be checked

  @mockserver
  Example: Should update the URL when the filters are applied
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters?termsFilter=Purple&termsFilter=Orange"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/filters/request-terms-array" fixture
    And the search listing results should have following items:
      | title   |
      | Apples  |
      | Oranges |

    When I type "the" into the search input
    Then I toggle the search listing filters section
    And I click the search listing dropdown field labelled "Term filter example"
    Then I click the option labelled "Blue" in the selected dropdown
    And I click the search listing dropdown field labelled "Term filter example"

    When I click the search listing dropdown field labelled "Terms filter example"
    Then the selected dropdown field should have the items:
      | Orange |
      | Purple |
      | Yellow |
    Then I click the option labelled "Purple" in the selected dropdown
    And I click the search listing checkbox field labelled "Show archived content"
    And I submit the search filters
    Then the URL should reflect that the current active filters are as follows:
      | id             | value    |
      | q              | the      |
      | termFilter     | Blue     |
      | termsFilter    | Orange   |
      | checkboxFilter | Archived |

  @mockserver
  Example: Dependent filter - Should reflect the value from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/dependent-filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/dependent-filters/response" and status 200

    When I visit the page "/filters?dependentFilter=Mammals:Dogs,Cats"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/dependent-filters/request" fixture
    Then the filters toggle should show 2 applied filters

    When I toggle the search listing filters section
    Then the search listing dropdown field labelled "Terms dependent example" should have the value "Mammals"
    Then the search listing dropdown field labelled "Terms dependent child example" should have the value "Dogs, Cats"
    When I click the search listing dropdown field labelled "Terms dependent example"
    Then the selected dropdown field should have the items:
      | Mammals |
      | Birds   |
    When I click the search listing dropdown field labelled "Terms dependent child example"
    Then the selected dropdown field should have the items:
      | Dogs |
      | Cats |

  @mockserver
  Example: Dependent filter - Child options should update on parent selection
    Given the page endpoint for path "/filters" returns fixture "/search-listing/dependent-filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/dependent-filters/response" and status 200
    When I visit the page "/filters"
    Then the search listing page should have 2 results
    And the search network request should be called with the "/search-listing/dependent-filters/request-empty" fixture

    When I toggle the search listing filters section
    And I click the search listing dropdown field labelled "Terms dependent example"
    Then I click the option labelled "Birds" in the selected dropdown
    And I click the search listing dropdown field labelled "Terms dependent child example"
    Then the selected dropdown field should have the items:
      | Parrot   |
      | Cockatoo |

  @mockserver
  Example: Should hide the search form when hideSearchForm is set
    Given the page endpoint for path "/no-search-form" returns fixture "/search-listing/filters/page-no-search-form" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/no-search-form"
    Then the search listing page should have 2 results
    And the search form should be hidden

