Feature: Search listing - Analytics

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device

  @mockserver
  Example: Listing emits search related events for analytics
    Given the page endpoint for path "/search-listing" returns fixture "/search-listing/filters/page-simple" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response-large" and status 200

    When I visit the page "/search-listing"
    And I wait 400 milliseconds
    Then I type "the" into the search input
    And I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Term filter example"
    And I click the option labelled "Blue" in the selected dropdown
    And I click the search listing dropdown field labelled "Term filter example"
    And I submit the search filters
    And I wait 400 milliseconds
    Then I clear the search filters
    And I toggle the search listing filters section
    And I click 'next' in the pagination controls
    And I wait 400 milliseconds

    Then the dataLayer should include the following events
      | event                | name           | form_id             | element_text         | filters         | count | label | component           | index |
      | view_search_results  | Simple listing | tide-search-listing |                      |                 | 133   |       | tide-search-listing | 1     |
      | open_filters         | Simple listing | tide-search-listing | Filters              |                 |       | the   | tide-search-listing |       |
      | search               | Simple listing | tide-search-listing | Apply search filters | termFilter=Blue |       | the   | tide-search-listing |       |
      | view_search_results  | Simple listing | tide-search-listing |                      | termFilter=Blue | 133   | the   | tide-search-listing | 1     |
      | clear_search_filters | Simple listing | tide-search-listing | Clear search filters | termFilter=Blue | 133   | the   | tide-search-listing |       |
      | view_search_results  | Simple listing | tide-search-listing |                      |                 | 133   |       | tide-search-listing | 1     |
      | close_filters        | Simple listing | tide-search-listing | Filters              |                 |       |       | tide-search-listing |       |
      | paginate_next        | Simple listing | tide-search-listing | Next                 |                 | 133   |       | tide-search-listing | 2     |
      | view_search_results  | Simple listing | tide-search-listing |                      |                 | 133   |       | tide-search-listing | 2     |

  @mockserver
  Example: Filters emit data for analytics
    Given the page endpoint for path "/filters" returns fixture "/search-listing/filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/filters/response" and status 200
    When I visit the page "/filters"
    And I toggle the search listing filters section

    When I click the search listing dropdown field labelled "Term filter example"
    Then I click the option labelled "Blue" in the selected dropdown
    Then I click the option labelled "Green" in the selected dropdown
    And I click the search listing dropdown field labelled "Term filter example"

    When I click the search listing dropdown field labelled "Single term filter example"
    Then I click the option labelled "Aqua" in the selected dropdown
    When I click the search listing dropdown field labelled "Single term filter example"
    Then I click the option labelled "Select a single colour" in the selected dropdown

    When I click the search listing checkbox field labelled "Show archived content"
    And I click the search listing checkbox field labelled "Show archived content"

    When I click the search listing checkbox field labelled "Weekdays"
    Then I click the search listing checkbox field labelled "Weekends"
    And I click the search listing checkbox field labelled "Weekdays"
    And I click the search listing checkbox field labelled "Weekends"
    Then I submit the search filters

    And the dataLayer should include the following events
      | event             | label                      | form_name           | form_id                 | field_id                 | type     | value             | component               |
      | open_form_field   | Term filter example        | Grants and programs | tide-search-filter-form | termFilter               | select   |                   | rpl-form-dropdown       |
      | update_form_field | Term filter example        | Grants and programs | tide-search-filter-form | termFilter               | select   | Blue              | rpl-form-dropdown       |
      | update_form_field | Term filter example        | Grants and programs | tide-search-filter-form | termFilter               | select   | Blue,Green        | rpl-form-dropdown       |
      | close_form_field  | Term filter example        | Grants and programs | tide-search-filter-form | termFilter               | select   | Blue,Green        | rpl-form-dropdown       |
      | open_form_field   | Single term filter example | Grants and programs | tide-search-filter-form | singleTermFilter         | select   |                   | rpl-form-dropdown       |
      | update_form_field | Single term filter example | Grants and programs | tide-search-filter-form | singleTermFilter         | select   | Aqua              | rpl-form-dropdown       |
      | open_form_field   | Single term filter example | Grants and programs | tide-search-filter-form | singleTermFilter         | select   | Aqua              | rpl-form-dropdown       |
      | update_form_field | Single term filter example | Grants and programs | tide-search-filter-form | singleTermFilter         | select   |                   | rpl-form-dropdown       |
      | update_form_field | Show archived content      | Grants and programs | tide-search-filter-form | checkboxFilter__checkbox | checkbox | Archived          | rpl-form-option         |
      | update_form_field | Show archived content      | Grants and programs | tide-search-filter-form | checkboxFilter__checkbox | checkbox | false             | rpl-form-option         |
      | update_form_field | Checkbox group             | Grants and programs | tide-search-filter-form | checkboxFilterGroup      | checkbox | Weekdays          | rpl-form-checkbox-group |
      | update_form_field | Checkbox group             | Grants and programs | tide-search-filter-form | checkboxFilterGroup      | checkbox | Weekdays,Weekends | rpl-form-checkbox-group |
      | update_form_field | Checkbox group             | Grants and programs | tide-search-filter-form | checkboxFilterGroup      | checkbox | Weekends          | rpl-form-checkbox-group |
      | update_form_field | Checkbox group             | Grants and programs | tide-search-filter-form | checkboxFilterGroup      | checkbox |                   | rpl-form-checkbox-group |

  @mockserver
  Example: Dependent filter - emits analytics data as expected
    Given the page endpoint for path "/filters" returns fixture "/search-listing/dependent-filters/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/dependent-filters/response" and status 200
    When I visit the page "/filters"
    And I toggle the search listing filters section

    Then I click the search listing dropdown field labelled "Terms dependent example"
    And I click the option labelled "Mammals" in the selected dropdown
    Then I click the search listing dropdown field labelled "Terms dependent example"

    When I click the search listing dropdown field labelled "Terms dependent child example"
    And I click the option labelled "Dogs" in the selected dropdown
    Then I click the search listing dropdown field labelled "Terms dependent child example"

    When I click the search listing dropdown field labelled "Terms dependent grandchild example"
    And I click the option labelled "Beagle" in the selected dropdown
    And I click the option labelled "Spaniel" in the selected dropdown
    Then I click the search listing dropdown field labelled "Terms dependent grandchild example"
    Then I submit the search filters

    Then the dataLayer should include the following events
      | event             | label                              | form_name          | form_id                 | field_id          | type   | value          | component         |
      | open_form_field   | Terms dependent example            | Depenedent filters | tide-search-filter-form | dependentFilter-1 | select |                | rpl-form-dropdown |
      | update_form_field | Terms dependent example            | Depenedent filters | tide-search-filter-form | dependentFilter-1 | select | Mammals        | rpl-form-dropdown |
      | close_form_field  | Terms dependent example            | Depenedent filters | tide-search-filter-form | dependentFilter-1 | select | Mammals        | rpl-form-dropdown |
      | open_form_field   | Terms dependent child example      | Depenedent filters | tide-search-filter-form | dependentFilter-2 | select |                | rpl-form-dropdown |
      | update_form_field | Terms dependent child example      | Depenedent filters | tide-search-filter-form | dependentFilter-2 | select | Dogs           | rpl-form-dropdown |
      | close_form_field  | Terms dependent child example      | Depenedent filters | tide-search-filter-form | dependentFilter-2 | select | Dogs           | rpl-form-dropdown |
      | open_form_field   | Terms dependent grandchild example | Depenedent filters | tide-search-filter-form | dependentFilter-3 | select |                | rpl-form-dropdown |
      | update_form_field | Terms dependent grandchild example | Depenedent filters | tide-search-filter-form | dependentFilter-3 | select | Beagle         | rpl-form-dropdown |
      | update_form_field | Terms dependent grandchild example | Depenedent filters | tide-search-filter-form | dependentFilter-3 | select | Beagle,Spaniel | rpl-form-dropdown |
      | close_form_field  | Terms dependent grandchild example | Depenedent filters | tide-search-filter-form | dependentFilter-3 | select | Beagle,Spaniel | rpl-form-dropdown |
