# 8-FE-page-2 View Basic Page
Feature: Basic Page
  As a citizen I want to view a Basic page within the site

  Scenario: 8-FE-page-2 View Basic Page 
    Given the "/8-be-page-1-create-basic-page" page exists with fixture "page/8-BE-page-1-basic-page" data
    When I visit the page "/8-be-page-1-create-basic-page"
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
      | title                             | url                                                   | 
      | Related Link external  text       | https://emergency.vic.gov.au/respond/#                |
      | Department of Premier and  Cabinet | https://www.vic.gov.au/department-premier-and-cabinet |
    # Whats Next
    And the whats next component should exist
    And the whats next title should be "What's next?"
    And the whats next links should be:
      | title                                  | url                                                    |
      | State Government of  Victoria           | https://www.vic.gov.au                                |             
      | Department of Premier and  Cabinet      | https://www.vic.gov.au/department-premier-and-cabinet |
    # Share this
    And the share this component should exist
    And the share this component should have the title "Share this"
    And the share this component should have the following social links:
      | network | 
      | Twitter |
      | Facebook |
      | LinkedIn |


