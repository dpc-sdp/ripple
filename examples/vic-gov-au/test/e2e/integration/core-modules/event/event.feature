Feature: Event page
  As a citizen I can view information for all available content on an event page
  Prerequisite: Events Simple Test 1-BE-event-1

  Scenario: Event Page loads correctly
    Given the "/2-be-event-1" page exists with fixture "event/2-BE-event-1" data
    When I visit the page "/2-be-event-1"
    Then the page title should be "2-BE-event-1"
    And the event page Description should be "So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home."
    And the event page Dates should be "20 May 2019 09:02 pm - 20 May 2019 09:11 pm"
    And the event page Address should be "45 Collins St,  Melbourne, VIC 3000"
    And the event page Price should be "34.33 - 89.95"
    And the event page Web url should be "http://www.weatherzone.com.au/vic/central/healesville"
    And the event page Body should be "So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home."
    And the event page Booking Url link should be "http://examplebook.com"
    And the event page Booking Text should be "Booking URL"

    # Related links
    And the related links component should exist
    And the related links title should be "Related links"
    And the related links should contain the following links:
      | title                              | url                                                   |
      | State Government of  Victoria      | https://www.vic.gov.au                                |
      | Department of Premier and  Cabinet | https://www.vic.gov.au/department-premier-and-cabinet |

    # Social Sharing
    And the share this component should exist
    And the share this component should have the title "Share this"
    And the share this component should have the following social links:
      | network |
      | Twitter |
      | Facebook |
      | LinkedIn |
    And the share this links should read "open in a new window" to screen readers

    # Contact Us
    And the contact component title should be "Victorian Government"
    And the contact component details should be "Victorian Government Department of Premier and Cabinet Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001"
    And the contact component should have the following items:
      | link                                                                                                                      | linktext                                                             |
      | https://www.google.com.au/maps?q=Department%20of%20Premier%20and%20Cabinet,%20GPO%20Box%204509,%20Melbourne,%20VIC%203001 | Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001 |
      | tel:1300366356                                                                                                            | Calls in Australia 1300 366 356                                      |
      | tel:+61396038804                                                                                                          | Calls from overseas +61 3 9603 8804                                  |
      | mailto:no-reply@vic.gov.au                                                                                                | no-reply@vic.gov.au                                                  |