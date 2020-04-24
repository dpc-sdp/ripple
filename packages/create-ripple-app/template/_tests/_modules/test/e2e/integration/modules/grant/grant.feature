Feature: Grant page

  As a citizen I can view information about a specific grant, including grant amount, audience, etc.
  https://digital-engagement.atlassian.net/browse/SDPA-175
  
  Background: Reset date to today before each test
    Given the current date is today

  Scenario: BE - Create TC-9a Grant
    Given I have logged into the backend
    And in the backend there is a node at "/tc-9a-grant" with "modules/grant/tc-9a-grant" data
    And in the backend there is a node at "/tc-9b-grant" with "modules/grant/tc-9b-grant" data

  Scenario: FE - TC-9a Grant - Simple Test - Date Range
    Given that the current date is "April 10, 2019 00:00:00"
    And I visit the page "/tc-9a-grant"
    Then the page title should be "TC-9a Grant Simple Test - Date Range"
    And the grant overview price should be "$11,326 - $26,494"
    And the grant overview audience should be "Businesses"
    And the grant overview open status is "Open, closing in 28 days"
    And the timeline component should exist
    And the timeline title should be "Demo Timeline"
    And there should be the following timeline items:
      | title              | link                   | image              | subtitle   | description                                                                                 |
      | Demo Timeline Item | https://www.google.com | Melbourne-tram.jpg | 01 January | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. |
    And the grant guideline section title should be "Guidelines"
    And the grant guideline should have the following accordions
      | "Eligibility"         |
      | "Assessment criteria" |
      | "Assessment process"  |
      | "How to apply"        |
    And the page should have the following documents:
      | title                | size    | type |
      | Demo Sample Document | 7.53 KB | docx | 
    And the content rating component should exist
  
  Scenario: FE - TC-9b Grant page - Closed
    Given that the current date is "April 10, 2019 00:00:00"
    And I visit the page "/tc-9b-grant"
    Then the page title should be "TC-9b Grant page - Closed"
    And the grant overview open status is "Closed"
