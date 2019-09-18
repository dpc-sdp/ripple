Feature: Landing page

  As a citizen I can view information for all available content on any given landing page

  Scenario: 5-FE-land-6 Landing Page - Complete Test
    Given the "/5-be-land-3-landing-page-complete-test" page exists with fixture "landingPage/5-be-land-3-landing-page-complete-test" data
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
    And the order number 1 wysiwyg content matches fixture "landingPage/5-be-land-3-landing-page-complete-test"

    # Accordion
    And there should be 2 accordion components
    And the number 1 accordion title should be "Accordion Title"
    And the accordion titled "Accordion Title" should contain the following items:
      | title             | body        |
      | Accordion Content | Lorem ipsum |

    # Card Event carousel
    And there should be a card carousel titled "Latest items (Event)"
    And the card carousel titled "Latest items (Event)" should have 9 items
    And the card carousel titled "Latest items (Event)" should have the following items:
      | date                              | title                                                          | summary                                                                                                                                                                                                                                                    | address                                                              | link                                                         | linktext           |
      | 02 to 07 July                     | Demo Event                                                     | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.                                                                                                         | Department of Premier and Cabinet, GPO Box 4509, Melbourne, VIC 3001 | /demo-event                                                  | See event  details |
      | 05 February to 13 September 2019  | Little Seeds - Early Years Nature Play and Gardening Program   | Calling all Little Seeds. Come and get your hands dirty and let your imagination run free as you tend to your very own garden patch.                                                                                                                       | Birdwood Avenue,  South Yarra, VIC 3141                              | /little-seeds-early-years-nature-play-and-gardening-program  | See event  details |
      | 02 to 13 September                | La Vuelta Winemakers Lunch at Mitchelton                       | This Grand Final Eve, Mitchelton is celebrating Australia’s love of ball sports, days off and rotating beef on the spit. Enjoy mixed cuts of succulent                                                                                                     | 470 Mitchellstown Road,  Nagambie, VIC 3608                          | /la-vuelta-winemakers-lunch-mitchelton                       | See event  details |
      | 13 September                      | My Little - exhibition opening                                 | Lord Coconut presents the fifth annual Melbourne Cufflink Exhibition and Student Acquisitive Prize.\\n\\nThe exhibition features handcrafted cufflinks by some of the best jewellery students                                                              | 358 Lonsdale Street, Level 5 Mitchell House, Melbourne, VIC 3000     | /my-little-exhibition-opening                                | See event  details |
      | 13 September                      | Convent Kids: Sapling School                                   | Join an outdoor expedition for curious kids and their adults led by play specialist Catherine Sewell and gardener Matthew Henry. Through singing, storytelling and hands-on                                                                                | 1 St Heliers Street,  Abbotsford, VIC 3067                           | /convent-kids-sapling-school                                 | See event  details |
      | 13 September                      | 2019 Toyota AFL Finals, SF1: Geelong Cats v West Coast Eagles  | 13 September 2019 Toyota AFL Finals, SF1: Geelong Cats v West Coast Eagles September. It's the miracle month. Four weeks of unscripted drama that compels, captivates and astounds. The thrill of possibility.\\n\\nWitness history made, legends born and | Jolimont Road,  East Melbourne, VIC 3002                             | /2019-toyota-afl-finals-sf1-geelong-cats-v-west-coast-eagles | See event  details |
      | 13 September                      | Albert Park College - Vaudeville: HERO                         | Albert Park College proudly presents Vaudeville 2019: HERO. A highlight of our school calendar, Vaudeville is a celebration of our school through the performing arts                                                                                      | 20 Carlisle Street,  St Kilda, VIC 3182                              | /albert-park-college-vaudeville-hero                         | See event  details |
      | 13 September                      | Tiny Acts Of Kindness Really Do Change The World               | Join us for a delicious vegan lunch from the Edgar’s Mission cook book “Cooking with Kindness” matched with wines from Baillieu and Elgee Park.\\nPam                                                                                                      | 3460 Frankston - Flinders Road,  Merricks, VIC 3916                  | /tiny-acts-kindness-really-do-change-world                   | See event  details |
      | 13 September                      | Hey Hey It's Friday Presents: Poppa & Jonesy                   | Hey Hey It's Friday Presents: Poppa & Jonesy\\n\\nAfter performing sold out shows in the Melbourne International Comedy Festival Poppa Rozaia and Cody Jones have                                                                                          | 60 Lydiard Street North,  Ballarat Central, VIC 3350                 | /hey-hey-its-friday-presents-poppa-jonesy                    | See event  details |

    # Promotion
    # <----------------------------------------------- TESTS IMPLEMENTED TO HERE
    And there should be a promotion card with the title "INSERT DATA"
    And the navigation card titled "INSERT DATA" should contain the following:
      | title | summary | ctalink | ctatext |
      # Add data table here

    # Card Promotion Automated
    And there should be a navigation card with the title "INSERT DATA"
    And the navigation card titled "INSERT DATA" should contain the following:
      | title | summary | ctalink | ctatext |

    # Navigation Featured
    And there should be a navigation featured card with the title "INSERT DATA"
    And the navigation card featured titled "INSERT DATA" should contain the following:
      | title | image | summary | link |

    # Navigation Featured Automated
    And there should be a navigation featured automated card with the title "INSERT DATA"
    And the navigation featured automated card titled "INSERT DATA" should contain the following:
      | link | linktext |

    # SAMI - Please copy the examples above to rewrite the next ones in the same format

    # Navigation
    Then Title should match test data
    And Summary should match test data
    And Link text should match test data
    And Link  should match test data

    # Navigation Automated
    Then Title should match test data
    And Summary should match test data
    And Link text should match test data
    And Link  should match test data

    # Key Dates
    Then Heading should match test data
    And Key Dates should match test data
    And Title should match test data
    And Summary should match test data
    And Link text should match test data
    And Link  should match test data

    # Featured News
    Then Title should match test data
    And Copy should match test data
    And Link should match test data
    And Title should match test data
    And Link should match test data

    # News Listing
    Then Title should match test data
    And Tag should match test data
    And Link Text should match test data
    And Link should match test data

    #Image Gallery
    Then Image should match test data
    And Image  should match test data
    And Image should match test data
    And Image should match test data

    # Card Event Automated
    Then Date should match test data
    And Title should match test data
    And Copy should match test data
    And Location should match test data
    And CTA Text should match test data
    And CTA Link should match test data

    # Card Carousel - add card event
    Then Title should match test data
    And Dates should match test data
    And Image should match test data
    And Card Event - Title  should match test data
    And Summary should match test data
    And Location should match test data
    And CTA Text should match test data
    And CTA Link should match test data

    #  Latest Events
    Then Heading should match test data
    And Tag should match test data
    And Date should match test data
    And Title should match test data
    And CTA Text should match test data
    And CTA Link should match test data
    And Tag should match test data
    And Date should match test data
    And Title should match test data
    And Summary should match test data
    And CTA Text should match test data

    #  Latest Events 2
    Then Heading should match test data
    And Description should match test data
    And CTA Link Text should match test data
    And CTA Link should match test data
    And Image should match test data

    #  Timelines
    Then Timelines Title should match test data
    And Title should match test data
    And Dates should match test data
    And Summary should match test data
    And Image should match test data
    And Link text should match test data
    And Link should match test data

    # Key Journeys
    Then Title should match test data
    And Link Text should match test data
    And Link   should match test data

    # Contact Us
    Then Title should match test data
    And Name should match test data
    And Department Name should match test data
    And Postal Address should match test data
    And Address should match test data
    And Phone should match test data
    And Phone should match test data
    And Email should match test data
    And Link Text should match test data
    And Link should match test data
    And Link Text should match test data
    And Link should match test data

    # Call to action
    And there should be a navigation featured card with the title "INSERT DATA"
    And the navigation card featured titled "INSERT DATA" should contain the following:
      | title | image | summary | link |

    # Related Links
    And the related links component should exist
    And the related links title should be "Related links"
    And the related links should contain the following links:
      | title                             | url                                                   |
      | Related Link external  text       | https://emergency.vic.gov.au/respond/#                |
      | Department of Premier and  Cabinet | https://www.vic.gov.au/department-premier-and-cabinet |

    #What's Next
    And the whats next component should exist
    And the whats next title should be "What's next?"
    And the whats next links should be:
      | title                                  | url                                                    |
      | State Government of  Victoria           | https://www.vic.gov.au                                |
      | Department of Premier and  Cabinet      | https://www.vic.gov.au/department-premier-and-cabinet |

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
    And the content rating form should exist
    And the content rating form legend should be "Was this page helpful?"
    When I click the "yes" radio button in the content rating form
    Then the content rating form summary textfield should display
    And the the content rating form "Cancel" button should be visible
    And the the content rating form "Submit" button should be visible
