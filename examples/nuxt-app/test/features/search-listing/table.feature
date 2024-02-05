Feature: Search listing table layout

  I can see a collection of results displayed in a tabular form

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200
    And I am using a "macbook-16" device
    And the search autocomplete request is stubbed with "/search-listing/suggestions/none" fixture

  @mockserver
  Example: Grants
    Given the page endpoint for path "/search-listing-table" returns fixture "/search-listing/table/page" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    Then the table should not display extra content

  @mockserver
  Example: Table shows extra content using a custom component
    Given the page endpoint for path "/search-listing-table-extra-components" returns fixture "/search-listing/table/page-extra-component" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response" and status 200
    When I visit the page "/search-listing-table-extra-components"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    And the table should have the caption "My Table"
    And the table should have the footer "Some notes about the table"
    When I toggle the tables extra content row
    Then the tables extra content should contain the text "Details: 1 Implemented"

  @mockserver
  Example: Table shows extra structured content using object keys and components
    Given the page endpoint for path "/search-listing-table-structured" returns fixture "/search-listing/table/page-extra-structured" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response-elastic" and status 200
    When I visit the page "/search-listing-table-structured"
    And the search network request should be called with the "/search-listing/table/request" fixture
    And the search listing layout should be "table"

    Given a data table with type "search-listing-layout-table"
    When I toggle the tables extra content row
    Then the tables extra content should contain the text "African Family Services"
    Then the tables extra content should contain the label "Funded for" and text "Multicultural Service"
    And the tables extra content should contain the label "Email", value "contact@africanfamilyservices.org.au" and link "mailto:contact@africanfamilyservices.org.au"
    And the tables extra content should contain the label "Phone", value "03 9602 5046" and link "tel:03 9602 5046"
    And the tables extra content should contain the label "Website", value "http://africanfamilyservices.org.au/#contact-us" and link "http://africanfamilyservices.org.au/#contact-us"
    And the tables extra content should contain the text "Includes statewide service"
    And the tables extra content should contain the class "rpl-tag--dark"

  @mockserver
  Example: Table renders cells using core components
    Given the page endpoint for path "/search-listing-table-structured" returns fixture "/search-listing/table/page-extra-structured" with status 200
    And the search network request is stubbed with fixture "/search-listing/table/response-elastic" and status 200
    When I visit the page "/search-listing-table-structured"
    And the search network request should be called with the "/search-listing/table/request" fixture

    Given a data table with type "search-listing-layout-table"
    Then the table should have the column "Email", with value "contact@africanfamilyservices.org.au" and link "mailto:contact@africanfamilyservices.org.au"
    And the table should have the column "Phone", with value "03 9602 5046" and link "tel:03 9602 5046"
    And the table should have the column "Website", with value "http://africanfamilyservices.org.au/#contact-us" and link "http://africanfamilyservices.org.au/#contact-us"
