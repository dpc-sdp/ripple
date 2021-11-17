Feature: Data Listing

  As a Citizen I want to be able to view data sets from data.vic.gov.au as tabular and spacial visualisations.
  
  Scenario: Fair jobs code
    Given the mock server has started
    And the endpoint "http://localhost:3001/mockdatavicapi/action/datastore_search" with query "?resource_id=0cf2ea00-0fa2-45e3-952f-99c2277c1fe8&limit=10000" returns fixture "custom/data-listing/fairjobs" with status 200 
    When I visit the page "/data-list-test"
    Then the data listing component count should display "Displaying 1-10 of 15 results"