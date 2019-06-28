Feature: Grant page

  As a citizen I can view information about a specific grant, including grant amount, audience, etc.
  https://digital-engagement.atlassian.net/browse/SDPA-175

  # Before hook
  # - Logs into backend
  # - Creates grant page from fixture data @pageData and saves node id as @nodeId

  # After hook
  # - Deletes node id @nodeId

  Scenario: TC-9a Grant - Simple Test - Date Range
    Given I have created a grant page with the fixture "Pages/Grant/tc9a"
    And I have navigated to the created page
    Then the page title should be "TC- 9a Grant- Simple Test - Date Range"
    And the grant overview title should match test data
    And the grant overview price should be "$11,326 - $26,494"
    And the grant overview audience should be "Individuals"
    And the grant overview open status is "Ongoing"
    And the grant overview description should match test data
    And the timeline component should exist
    And the timeline section title should match test data
    And the timeline item title should match test data
    And the timeline item date should be "08 April to 08 May 0019"
    And the grant guideline section title should be "Guidelines"
    And the grant guideline should have the following accordions
      | "Eligibility"         |
      | "Assessment criteria" |
      | "Assessment process"  |
      | "How to apply"        |


  Scenario: TC-9b Grant page - Closed
    Given I have created a grant page with the fixture "Pages/Grant/tc9b"
    And that the current date is "April 10, 2019 03:24:00"
    And I have navigated to the created page
    Then the page title should be "TC- 9b Grant- Simple Test - Closed"
    And the grant overview title should match test data
    And the grant overview price should be "$12,345 - $23,456"
    And the grant overview audience should be "Individuals"
    And the grant overview open status is "Closed"
    And the grant overview description should match test data
    And the timeline component should exist
    And the timeline section title should match test data
    And the timeline item title should match test data
    And the timeline item date s\hould be "07 to 08 April"
    And the grant guideline section title should be "Guidelines"
  
  Scenario: TC-10a Grant page - Complete
    Given I have created a grant page with the fixture "Pages/Grant/tc10a"
    And that the current date is "April 10, 2019 03:24:00"
    And I have navigated to the created page
    Then the page title should be "TC-10a Grant page - Complete"
    And the grant overview title should match test data
    And the grant overview price should be "$12,345 - $23,456"
    And the grant overview audience should be "Individuals, government"
    And the grant overview open status is "Closed"
    And the grant overview description should match test data
    And the timeline component should exist
    And the timeline section title should match test data
    And the timeline item title should match test data
    And the timeline item date should be "08 April to 08 May 2019"
    And the grant guideline section title should be "Guidelines"
    And the grant guideline should have the following accordions
      | "test1" |
      | "test2" |
      | "test3" |
      | "test4" |