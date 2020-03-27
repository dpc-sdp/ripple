# 8-FE-page-2 View Basic Page
Feature: Basic Page
  As a citizen I want to view a Basic page within the site

  Scenario: BE - create basic page
    Given I have logged into the backend
    And in the backend there is a node at "/8-be-page-1-create-basic-page" with "page/8-BE-page-1-basic-page" data

  Scenario: 8-FE-page-2 View Basic Page 
    When I visit the page "/8-be-page-1-create-basic-page"
    Then the page design should match the snapshot
    And it has no detectable a11y violations on load
    # Page Header	
    Then the page title should be "8-BE-page-1 Create Basic page"
    And the hero banner desciption should be "Intro So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get END."
    # wysiwyg	
    And the order number 1 wysiwyg content contains fixture "snippets/callout"
    And the order number 1 wysiwyg content contains fixture "snippets/blockquote"
    # And the order number 1 wysiwyg content contains fixture "snippets/document"
    # Related Links
    And the related links component should exist
    And the related links title should be "Related links"
    And the related links should contain the following links:
      | title                             | url                     | 
      | Related Link external  text       | https://www.google.com  |
      | Department of Premier and  Cabinet | https://www.google.com |
    # Whats Next
    And the whats next component should exist
    And the whats next title should be "What's next?"
    And the whats next links should be:
      | title                                  | url                     |
      | State Government of  Victoria           | https://www.google.com |             
      | Department of Premier and  Cabinet      | https://www.google.com |
    # Share this
    And the share this component should exist
    And the share this component should have the title "Share this"
    And the share this component should have the following social links:
      | network | 
      | Twitter |
      | Facebook |
      | LinkedIn |


