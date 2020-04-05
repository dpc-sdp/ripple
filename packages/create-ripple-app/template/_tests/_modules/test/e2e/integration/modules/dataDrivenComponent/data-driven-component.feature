Feature: Data driven component

  As a citizen I need to be able to view maps on the site
  
  # Not ready yet - ddc doesnt seem to be working
  @skip 
  Scenario: BE - Create landingpage with data driven component
    Given I have logged into the backend
    And in the backend there is a node at "/2-data-driven-component" with "modules/data-driven-component/1-data-driven-component" data
