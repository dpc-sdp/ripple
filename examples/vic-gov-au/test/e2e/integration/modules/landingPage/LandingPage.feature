Feature: Landing page

  As a citizen I can view information for all available content on any given landing page

  Scenario: BE - Create landing page
    Given I have logged into the backend
    And in the backend there is a node at "/5-be-land-3-landing-page-complete-test" with "modules/landingPage/5-be-land-3-landing-page-complete-test" data
    And in the backend there is a node at "/5-be-land-4-responsive-images-test" with "modules/landingPage/5-be-land-4-responsive-images" data

  Scenario: FE - 5-FE-land-6 Landing Page - Complete Test
    When I visit the page "/5-be-land-3-landing-page-complete-test"

    # Page Header
    Then the page title should be "5-BE-land-3 Landing Page - Complete Test"
    And the hero banner desciption should be "5-BE-land-3  Landing Page - Complete Test Intro"

    # Primary Campaign
    And the campaign primary banner component should exist
    And the campaign primary banner should contain:
      | title         | body                                                                                                                    | ctatext       | ctalink                |
      | Demo Campaign | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vobis voluptatum perceptarum recordatio vitam beatam facit | Find out more | https://www.vic.gov.au |

    # Secondary Campaign
    And the campaign secondary component should exist
    And the campaign secondary component should contain:
      | title                 | body                                                                                                                    | ctatext       | ctalink                |
      | Another Demo Campaign | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vobis voluptatum perceptarum recordatio vitam beatam facit | Find out more | https://www.vic.gov.au |

    # Body Content
    And the order number 1 wysiwyg content contains fixture "modules/landingPage/5-be-land-3-landing-page-complete-test"

    # Accordion
    And there should be 2 accordion components
    And the number 1 accordion title should be "Accordion Title"
    And the accordion titled "Accordion Title" should contain the following items:
      | title             | body        |
      | Accordion Content | Lorem ipsum |

    # Card Event carousel
    And there should be a card carousel titled "Latest items (Event)"
    # And the card carousel titled "Latest items (Event)" should have 9 items
    # Disabled as Event Carousel data is not stable.
    # And the card carousel titled "Latest items (Event)" should have the following items:
    #   | date                             | title                                                         | summary                                                                                                                                                                                                                                                    | address                                                              | link                                                         | linktext           |
    #   | 02 to 07 July                    | Demo Event                                                    | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.                                                                                                         | Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001 | /demo-event                                                  | See event  details |
    #   | 05 February to 13 September 2019 | Little Seeds - Early Years Nature Play and Gardening Program  | Calling all Little Seeds. Come and get your hands dirty and let your imagination run free as you tend to your very own garden patch.                                                                                                                       | Birdwood Avenue,  South Yarra, VIC 3141                              | /little-seeds-early-years-nature-play-and-gardening-program  | See event  details |
    #   | 02 to 13 September               | La Vuelta Winemakers Lunch at Mitchelton                      | This Grand Final Eve, Mitchelton is celebrating Australia’s love of ball sports, days off and rotating beef on the spit. Enjoy mixed cuts of succulent                                                                                                     | 470 Mitchellstown Road,  Nagambie, VIC 3608                          | /la-vuelta-winemakers-lunch-mitchelton                       | See event  details |
    #   | 13 September                     | My Little - exhibition opening                                | Lord Coconut presents the fifth annual Melbourne Cufflink Exhibition and Student Acquisitive Prize.\\n\\nThe exhibition features handcrafted cufflinks by some of the best jewellery students                                                              | 358 Lonsdale Street, Level 5 Mitchell House, Melbourne, VIC 3000     | /my-little-exhibition-opening                                | See event  details |
    #   | 13 September                     | Convent Kids: Sapling School                                  | Join an outdoor expedition for curious kids and their adults led by play specialist Catherine Sewell and gardener Matthew Henry. Through singing, storytelling and hands-on                                                                                | 1 St Heliers Street,  Abbotsford, VIC 3067                           | /convent-kids-sapling-school                                 | See event  details |
    #   | 13 September                     | 2019 Toyota AFL Finals, SF1: Geelong Cats v West Coast Eagles | 13 September 2019 Toyota AFL Finals, SF1: Geelong Cats v West Coast Eagles September. It's the miracle month. Four weeks of unscripted drama that compels, captivates and astounds. The thrill of possibility.\\n\\nWitness history made, legends born and | Jolimont Road,  East Melbourne, VIC 3002                             | /2019-toyota-afl-finals-sf1-geelong-cats-v-west-coast-eagles | See event  details |
    #   | 13 September                     | Albert Park College - Vaudeville: HERO                        | Albert Park College proudly presents Vaudeville 2019: HERO. A highlight of our school calendar, Vaudeville is a celebration of our school through the performing arts                                                                                      | 20 Carlisle Street,  St Kilda, VIC 3182                              | /albert-park-college-vaudeville-hero                         | See event  details |
    #   | 13 September                     | Tiny Acts Of Kindness Really Do Change The World              | Join us for a delicious vegan lunch from the Edgar’s Mission cook book “Cooking with Kindness” matched with wines from Baillieu and Elgee Park.\\nPam                                                                                                      | 3460 Frankston - Flinders Road,  Merricks, VIC 3916                  | /tiny-acts-kindness-really-do-change-world                   | See event  details |
    #   | 13 September                     | Hey Hey It's Friday Presents: Poppa & Jonesy                  | Hey Hey It's Friday Presents: Poppa & Jonesy\\n\\nAfter performing sold out shows in the Melbourne International Comedy Festival Poppa Rozaia and Cody Jones have                                                                                          | 60 Lydiard Street North,  Ballarat Central, VIC 3350                 | /hey-hey-its-friday-presents-poppa-jonesy                    | See event  details |

    # Promotion
    And there should be a promotion card with the title "Card Promotion"
    And the promotion card titled "Card Promotion" should contain the following:
      | date    | title          | summary                                                                                     | ctalink                | ctatext             |
      | 02 July | Card Promotion | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | https://www.google.com | Vestibulum  rhoncus |

    # Card Promotion Automated
    And there should be a promotion card with the title "Demo Page"
    And the promotion card titled "Demo Page" should contain the following:
       | title     | ctalink    | ctatext    | topic      |
       | Demo Page | /demo-page | Read  more | Demo Topic |

    # Navigation Featured
    And there should be a navigation featured card with the title "Card Promotion"
    And the navigation card featured titled "Card Promotion" should contain the following:
      | title          | image                                                                                                          | summary                                                                                     | link                   |
      | Card Promotion | Melbourne-tram.jpg | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | https://www.google.com |

    # Navigation Featured Automated
    And there should be a navigation featured automated card with the title "Demo News"
    And the navigation featured automated card titled "Demo News" should contain the following:
      | title     | image                                                                                                          | link       |
      | Demo News | Melbourne-tram.jpg | /demo-news |

    # Navigation
    And there should be a navigation card with the title "Card Promotion"
    And the navigation card titled "Card Promotion" should contain the following:
      | title          | summary                                                                                     | link                   | linktext           |
      | Card Promotion | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | https://www.google.com | Vestibulum rhoncus |

    # Navigation Automated
    And there should be a navigation card with the title "Demo Page"
    And the navigation card titled "Demo Page" should contain the following:
      | title     | link       |
      | Demo Page | /demo-page |

    # Key Dates
    And there should be a keydates card with the title "Key calendar dates"
    And the keydates card titled "Key calendar dates" should contain the following:
      | title              | ctalink                | ctatext    |
      | Key calendar dates | https://www.google.com | Read  more |
    And the keydates card titled "Key calendar dates" should have the following items:
      | date   | title           | description              |
      | 1 June | Demo Key Date   | First key date summary.  |
      | 2 June | Demo Key Date 2 | Second key date summary. |

    # Featured News
    And the featured news listing component should have the following items:
      | date    | tag        | title     | link       |
      | 02 July | Demo Topic | Demo News | /demo-news |

    # News Listing
    And the news listing component should exist
    # And there should be the following news listing components:
    #   | date         | tag        | title             | link                |
    #   | 02 July 2019 | Demo Topic | Test news page  1 | /test-news-page-1-5 |      
    #   | 02 July 2019 | Demo Topic | Demo  News        | /demo-news          |      

    # Image Gallery
    And the image gallery component should have the following items:
      | image                                                                                                                                          | title                                                |
      | 2018-19-State-Budget.jpg                         | 1 / 4 - Demo: 2018-19 State Budget                   |
      | Aerial-shot-of-new-housing-development.jpg | 2 / 4 - Demo: Aerial shot of new housing development |
      | Bendigo-Hospital.jpg                               | 3 / 4 - Demo: Bendigo Hospital                       |
      | Melbourne-tram.jpg                                 | 4 / 4 - Demo: Melbourne tram                         |

    # Card Event Automated
    And there should be an event card with the title "Demo Event"
    And the event card titled "Demo Event" should contain the following:
      | date          | title      | summary                                                                                                                                            | address   | link        | linktext   |
      | 02 to 07 July | Demo Event | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. | Melbourne | /demo-event | View  more |

    # Card Carousel - add card event
    And there should be a card carousel titled "Card Carousel for Card Event"
    And the card carousel titled "Card Carousel for Card Event" should have 2 items
    And the card carousel titled "Card Carousel for Card Event" should have the following items:
      | date                           | title                 | image              | summary                                                                                     | address   | link                   | linktext   |
      | 01 January to 12 December 2020 | Carousel Card Event   | Melbourne-tram.jpg | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | Melbourne | https://www.google.com | Read  more |
      | 01 January                     | Carousel Card Event 2 | Melbourne-tram.jpg | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | Melbourne | https://www.google.com | Read  more |
      
    #  Latest Events
    And there should be a latest events titled "Demo latest events"
    # And the latest events titled "Demo latest events" should have 6 items
    # Disabled as Latest Events data is not stable.
    # And the latest events titled "Demo latest events" should have the following items:
    #   | date          | title      | summary                                                                                                                                            | address                                                              | link        | linktext           |
    #   | 02 to 07 July | Demo Event | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. | Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001 | /demo-event | See event  details |
    And the latest events titled "Demo latest events" should have a call to action card with the following:
      | title          | body                                         | image                                                                                                          | linktext | link                   |
      | Latest Event 1 | Mauris tincidunt tincidunt felis vel tempus. | Melbourne-tram.jpg | See more | https://www.google.com |

    #  Timelines
    And the timeline component titled "Demo Timeline" should exist
    And the timeline component titled "Demo Timeline" should have the following items:
    | title                | date        | summary                                                                                     | image                                                                                                          | link                   |
    | Demo Timeline Item   | 01 January  | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. | Melbourne-tram.jpg | https://www.google.com |
    | Demo Timeline Item 2 | Alternative | Anim excepteur magna eu aliqua quis velit voluptate sit culpa.                              | Melbourne-tram.jpg | https://www.google.com |

    # Key Journeys
    And the key journey component should exist
    And the key journey component should have the following items:
      | linktext        | link               |
      | Nullam  laoreet | https://www.google.com|
      | Nullam  laoreet | https://www.google.com|

    # Contact Us
    And the contact component title should be "Victorian Government"
    And the contact component details should be "Victorian Government Department of Premier and Cabinet Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001"
    And the contact component should have the following items:
      | link                                                                                                                      | linktext                                                             |
      | https://www.google.com.au/maps?q=Department%20of%20Premier%20and%20Cabinet,%20GPO%20Box%204509,%20Melbourne,%20VIC%203001 | Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001 |
      | tel:1300366356                                                                                                            | Calls in Australia 1300 366 356                                      |
      | tel:+61396038804                                                                                                          | Calls from overseas +61 3 9603 8804                                  |
      | mailto:no-reply@vic.gov.au                                                                                                | no-reply@vic.gov.au                                                  |
      | https://twitter.com/VicGovAu                                                                                              | Twitter                                                              |

    # Call to action
    And there should be a call to action component with the title "Phasellus in varius leo"
    And the call to action component titled "Phasellus in varius leo" should contain the following:
      | title                   | image                                                                                                          | summary                                                                                                                                                              | link               | linktext             |
      | Phasellus in varius leo | Melbourne-tram.jpg | Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. Phasellus lacus lectus, sollicitudin sed posuere non, ultricies ut quam. | https://www.google.com | Victorian Government |

    # Related Links
    And the related links component should exist
    And the related links title should be "Related links"
    And the related links should contain the following links:
      | title                              | url                                                   |
      | State Government of  Victoria      | https://www.google.com                             |
      | Department of Premier and  Cabinet | https://www.google.com |

    # What's Next
    And the whats next component should exist
    And the whats next title should be "What's next?"
    And the whats next links should be:
      | title                              | url                                                   |
      | State Government of  Victoria      | https://www.google.com                               |
      | Department of Premier and  Cabinet | https://www.google.com |

    # Social Sharing
    And the share this component should exist
    And the share this component should have the title "Share this"
    And the share this component should have the following social links:
      | network |
      | Twitter |
      | Facebook |
      | LinkedIn |
    And the share this links should read "open in a new window" to screen readers

    # Content Rating
    And the content rating component should exist
    And the content rating component legend should be "Was this page helpful?"
    When I click the "Yes" radio button in the content rating component
    Then the content rating component summary textfield should display
    And the the content rating component "Cancel" button should be visible
    And the the content rating component "Submit" button should be visible
  
  Scenario: Responsive image banner
    Given I am using a "iphone-x" device
    When I visit the page "/5-be-land-4-responsive-images-test"
    Then the responsive image component should exist
