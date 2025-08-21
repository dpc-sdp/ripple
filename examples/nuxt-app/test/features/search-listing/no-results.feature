Feature: No results

  Render a component when no results match a given search, allow the use of a custom component

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture
    And I am using a "macbook-16" device

  @mockserver
  Example: Renders no results or empty index component
    Given the page endpoint for path "/" returns fixture "/search-listing/grid/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/"
    Then the search listing page should have 0 results
    And the empty index component should display "There are currently no records to display."

    When I type "qqq" into the search input
    And I click the search button
    Then the no results component should display "Sorry! We couldn't find any matches for qqq."

    When I toggle the search listing filters section
    Then I click the search listing dropdown field labelled "Topic"
    Then I click the option labelled "Bourke topic demo" in the selected dropdown
    Then I click the search listing dropdown field labelled "Topic"
    And I submit the search filters
    Then the no results component should display "Sorry! We couldn't find any matches for qqq."

    When I clear the search input
    Then I submit the search filters
    Then the no results component should display "Sorry! We couldn't find any matches."

    Then I clear the search filters
    And the empty index component should display "There are currently no records to display."

  @mockserver
  Example: Renders a custom no results or empty index component
    Given the page endpoint for path "/" returns fixture "/search-listing/no-results/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    When I visit the page "/"
    Then the search listing page should have 0 results
    And the empty index component should display "The index, it's empty!"

    When I type "the" into the search input
    And I click the search button
    Then the no results component should display "Alas no results."

  @mockserver
  Example: The empty index component message can be customised
    Given I load the page fixture with "/search-listing/grid/page"
    And the search network request is stubbed with fixture "/search-listing/errors/response-empty" and status 200
    Then the search listing results config has "emptyIndex.component" set to "TideSearchEmptyIndex"
    Then the search listing results config has "emptyIndex.props.title" set to "There is nothing to see..."
    Then the search listing results config has "emptyIndex.props.content" set to "Sorry about that."
    And the page endpoint for path "/" returns the loaded fixture

    When I visit the page "/"
    Then the search listing page should have 0 results
    And the empty index component should display "There is nothing to see..."
    And the empty index component should display "Sorry about that."
