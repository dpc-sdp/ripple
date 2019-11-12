Feature: Sitemap
  As a  citizen I want to be able to see all pages available  in the site
  
  Scenario: Sitemap page
    Given I visit the page "/sitemap"
    Then the page title should be "Site map"
    And the h1 should be "Site Map"
    And the site header is visible
    And the site footer is visible
    And there should be 2 breadcrumb items
    And the sitemap component should exist

  @skip
  Scenario: Sitemap xml
    Given a request is made to "/sitemap.xml"
    Then the response code should be 200