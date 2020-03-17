Feature: Event page
  As a citizen I can view information for all available content on an event page

  Scenario: BE - create event page
    Given I have logged into the backend
    And in the backend there is a node at "/2-be-event-1" with "event/2-BE-event-1" data

  Scenario: FE - Event Page loads correctly
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
