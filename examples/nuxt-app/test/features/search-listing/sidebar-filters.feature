Feature: Search listing - Sidebar filters

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture

  @mockserver
  Example: Sidebar filters are visible open on page load (desktop)
    Given I am using a "macbook-16" device
    Then the page endpoint for path "/filters" returns fixture "/search-listing/filters/filters-sidebar" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters"
    Then the search listing filters section should be open
    And the search listing filters should be within the sidebar

  @mockserver
  Example: Sidebar filters are collapsed open on page load (mobile)
    Given I am using a "iphone-x" device
    Then the page endpoint for path "/filters" returns fixture "/search-listing/filters/filters-sidebar" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters"
    Then the search listing filters section should not be open

  @mockserver
  Example: Submitting the search bar scrolls to results
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/filters-sidebar" with status 200
    And the search network request is stubbed with fixture "/search-listing/search-query/response" and status 200

    When I visit the page "/filters"
    And I type "The" into the search input
    And I click the search button
    Then I should be scrolled to the search results with an offset of 32

  @mockserver
  Example: Sidebar filters update the URL and tally when the filters are applied
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/filters-sidebar" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters"
    Then the search listing page should have 2 results
    And the sidebar filters heading should show 0 applied filters
    And the search network request should be called with the "/search-listing/filters/request-clear-empty" fixture

    When I type "the" into the search input
    And I click the search listing dropdown field labelled "Term filter example"
    Then I click the option labelled "Blue" in the selected dropdown

    When I click the search listing dropdown field labelled "Terms filter example"
    Then I click the option labelled "Purple" in the selected dropdown
    And I click the option labelled "Yellow" in the selected dropdown
    And I click the search listing dropdown field labelled "Terms filter example"

    When I click the search listing dropdown field labelled "Terms dependent example"
    And I click the option labelled "Mammals" in the selected dropdown
    When I click the search listing dropdown field labelled "Terms dependent child example"
    And I click the option labelled "Dogs" in the selected dropdown
    When I click the search listing dropdown field labelled "Terms dependent grandchild example"
    And I click the option labelled "Beagle" in the selected dropdown
    And I click the option labelled "Spaniel" in the selected dropdown
    Then I click the search listing dropdown field labelled "Terms dependent grandchild example"

    And I click the search listing checkbox field labelled "Show archived content"
    And I click the search listing checkbox field labelled "Weekdays"
    And I click the search listing checkbox field labelled "Weekends"

    Then I enter the range from "2025-02-22" to "2026-06-03" in the date range field labelled "Date range example"

    When I submit the search filters
    Then the URL should reflect that the current active filters are as follows:
      | id                  | value                            | index |
      | q                   | the                              | 0     |
      | termFilter          | Blue                             | 0     |
      | termsFilter         | Purple                           | 0     |
      | termsFilter         | Yellow                           | 1     |
      | dependentFilter     | dependentFilter-1:Mammals        | 0     |
      | dependentFilter     | dependentFilter-2:Dogs           | 1     |
      | dependentFilter     | dependentFilter-3:Beagle,Spaniel | 2     |
      | checkboxFilter      | Archived                         |       |
      | checkboxFilterGroup | Weekdays                         | 0     |
      | checkboxFilterGroup | Weekends                         | 1     |
      | dateRangeFilter     | from:2025-02-22                  | 0     |
      | dateRangeFilter     | to:2026-06-03                    | 1     |
    And the sidebar filters heading should show 8 applied filters

  @mockserver
  Example: Sidebar filters reflect values from the URL
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/filters-sidebar" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200

    When I visit the page "/filters?q=the&termFilter=Blue&termsFilter=Purple&termsFilter=Yellow&dependentFilter=dependentFilter-1:Mammals&dependentFilter=dependentFilter-2:Dogs&dependentFilter=dependentFilter-3:Beagle,Spaniel&checkboxFilter=Archived&checkboxFilterGroup=Weekends&dateRangeFilter=from:2025-02-22&dateRangeFilter=to:2026-06-03"
    And the search network request should be called with the "/search-listing/filters/request-sidebar" fixture
    And the sidebar filters heading should show 8 applied filters

    Then the search input should have the value "the"
    Then the search listing dropdown field labelled "Term filter example" should have the value "Blue"
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Purple, Yellow"
    Then the search listing dropdown field labelled "Terms dependent example" should have the value "Mammals"
    Then the search listing dropdown field labelled "Terms dependent child example" should have the value "Dogs"
    Then the search listing dropdown field labelled "Terms dependent grandchild example" should have the value "Beagle, Spaniel"
    And the search listing checkbox field labelled "Show archived content" should be checked
    And the search listing checkbox field labelled "Weekends" should be checked
    And the search listing date range field labelled "Date range example" should have the values
      | from       | to         |
      | 2025-02-22 | 2026-06-03 |

    When I clear the search filters
    And the sidebar filters heading should show 0 applied filters
    Then the URL should reflect that the current active filters are as follows:
      | id                  |
      | q                   |
      | termFilter          |
      | termsFilter         |
      | dependentFilter     |
      | checkboxFilter      |
      | checkboxFilterGroup |
      | dateRangeFilter     |
    Then the search input should have the value ""
    Then the search listing dropdown field labelled "Term filter example" should have the value "Select a colour"
    Then the search listing dropdown field labelled "Terms filter example" should have the value "Select a colour"
    Then the search listing dropdown field labelled "Terms dependent example" should have the value "Select a species"
    Then the search listing dropdown field labelled "Terms dependent child example" should have the value "All sub species"
    Then the search listing dropdown field labelled "Terms dependent grandchild example" should have the value "All sub sub species"
    And the search listing checkbox field labelled "Show archived content" should not be checked
    And the search listing checkbox group labelled "Checkbox group" should not have any options checked
    And the search listing date range field labelled "Date range example" should have the values
      | from | to |
      |      |    |
