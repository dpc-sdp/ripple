Feature: Events

  As a citizen I can view information for all available content on an event page
  Prerequisite: Events Simple Test 1-BE-event-1

  # Before hook
  # - Logs into backend
  # - Creates eventpage from fixture data @pageData and saves node id as @nodeId

  # After hook
  # - Deletes node id @nodeId

  Scenario: Event Page loads correctly
    When I have navigated to the created page
    Then the page title should be "2-BE-event-1"
    And the description should be "Now Neptune had gone off to the Ethiopians, who are at the world's end, and lie in two halves, the one looking West and the other East. He had gone there to accept a hecatomb of sheep and oxen, and was enjoying himself at his festival; but the other gods met in the house of Olympian Jove, and the sire of gods and men spoke first."
    And the list item 1 should be "20 May 2019 11:02 am - 13 May 2020 11:11 am"
    And the list item 2 should be "45 Collins St,  Melbourne, VIC 3000"
    And the list item 3 should be "34.33 - 89.95"
    And the list item 4 should be "https://www.weatherzone.com.au/vic/central/healesville"
    And the list item 5 should be "Accessible venue"
    And the body should be "So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home."
    And the image is present
    And the booking button text should be "External Link"
    And the booking button link should be "http://examplebook.com"
    And the booking button target should be "_blank"
