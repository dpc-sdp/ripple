Feature: Publication

  As a citizen I can view information for all available content on an publication page
  
  Scenario: Publication page
    Given I visit the page "/demo-publication"
    And the author information component should exist
    Then there should be a description list with the following items:
      | term    | value           |
      | Author  | Demo Department |
      | Date    | July 2019       |
    And the anchor links component should exist     
    And the contact component should exist
    And the accordion component should exist
    And there should be a navigation card with the title "Demo Publication - Chapter 1"
    And there should be a navigation card with the title "Demo Publication - Chapter 2"
    And there should be a navigation card with the title "Demo Publication - Chapter 3"
    And the content rating component should exist

  Scenario: Print all publication pages
    Given the "/demo-publication" route exists
    Given the "/demo-publication/demo-publication-chapter-1" route exists
    Given the "/demo-publication/demo-publication-chapter-2" route exists
    Given the "/demo-publication/demo-publication-chapter-1/demo-publication-chapter-1-page-1" route exists
    When I visit the page "/demo-publication/print-all"
    Then the page title should be "Demo Publication"
    And the following section title ids should exist:
      | section |
      | demo-publication-chapter-1        |
      | demo-publication-chapter-1-page-1 |
      | demo-publication-chapter-2        |
      | demo-publication-chapter-2-page-1 |
    And the author information component should exist
    And there should be a description list with the following items:
      | term    | value                                                                         |
      | Author  | Lorem ipsum dolor sit amet, Nulla ultricies dignissim, Integer interdum nisl  |
      | Date    | July 2019                                                                     |
    And the anchor links component should exist
    And the anchor link title should be "On this page:"
    And there should be the following anchor links:
      | text                                  | link                              |
      | Demo Publication - Chapter 1          | demo-publication-chapter-1        |
      | Demo Publication - Chapter 1 - Page 1 | demo-publication-chapter-1-page-1 |
      | Demo Publication - Chapter 1 - Page 2 | demo-publication-chapter-1-page-2 |
      | Demo Publication - Chapter 2          | demo-publication-chapter-2        |
      | Demo Publication - Chapter 2 - Page 1 | demo-publication-chapter-2-page-1 |
      | Demo Publication - Chapter 2 - Page 2 | demo-publication-chapter-2-page-2 |
      | Demo Publication - Chapter 2 - Page 3 | demo-publication-chapter-2-page-3 |
      | Demo Publication - Chapter 3          | demo-publication-chapter-3        |        
    And the contact component should exist
