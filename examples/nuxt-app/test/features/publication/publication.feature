Feature: Publication page

  Example of mocked page

  Background:
    Given the page endpoint for path "/victorian-skills-plan-2023-implementation-update" returns fixture "/publication/sample-publication" with status 200
    And the site endpoint returns fixture "/site/vic" with status 200

  @mockserver
  Example: Publication parent
    Given the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index" with status 200
    When I visit the page "/victorian-skills-plan-2023-implementation-update"
    Then the title should be "Victorian Skills Plan Implementation Update"
    And the publication details should include the following items
      | term          | description          |
      | Published by: | DPC                  |
      | Date:         | 24 Oct 2023          |
      | Copyright:    | All rights reserved. |
    And the publication should display the following chapters
      | title                                                            | content                                                                                 | url                                                                                                    |
      | The Victorian Skills Plan 2022 into 2023 actions and initiatives | The 25 initiatives scheduled to start in year one are well underway.                    | /victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives   |
      | Promoting post-secondary education skills and career pathways    | The first priority area's actions and initiatives from the Victorian Skills Plan 2022.  | /victorian-skills-plan-2023-implementation-update/promoting-post-secondary-education-skills-and-career |
      | Lifting participation in education and training                  | The second priority area's actions and initiatives from the Victorian Skills Plan 2022. | /victorian-skills-plan-2023-implementation-update/lifting-participation-education-and-training         |
    And the publication should display the following documents
      | title                                                    | url                                                                               | type | size    |
      | Victorian Skills Plan Implementation Update October 2023 | /sites/default/files/2023-10/16686-VSA-Implementation-Plan-Section_FA_Digital.pdf | pdf  | 4.61 MB |
      | Print full document                                      | /victorian-skills-plan-2023-implementation-update/print-all                       |      |         |
    When I click on the document "Victorian Skills Plan Implementation Update October 2023"
    Then the dataLayer should include the following events
      | event         | element_text                                             | file_name                                            | file_extension | file_size | component |
      | file_download | Victorian Skills Plan Implementation Update October 2023 | 16686-VSA-Implementation-Plan-Section_FA_Digital.pdf | pdf            | 4.61 MB   | rpl-file  |

  @mockserver
  Example: Publication child
    Given the page endpoint for path "/victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives" returns fixture "/publication/sample-publication-page" with status 200
    And the page endpoint for path "/victorian-skills-plan-2023-implementation-update/promoting-post-secondary-education-skills-and-career" returns fixture "/publication/sample-publication-page" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index" with status 200
    When I visit the page "/victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives"
    Then the title should be "The Victorian Skills Plan 2022 into 2023 actions and initiatives"
    And there should be a page link with a title of "Previous" and description text of "Victorian Skills Plan Implementation Update"
    And there should be a page link with a title of "Next" and description text of "Promoting post-secondary education skills and career pathways"
    And the publication should display the following documents
      | title                                                    | url                                                                               | type | size    |
      | Victorian Skills Plan Implementation Update October 2023 | /sites/default/files/2023-10/16686-VSA-Implementation-Plan-Section_FA_Digital.pdf | pdf  | 4.61 MB |
      | Print full document                                      | /victorian-skills-plan-2023-implementation-update/print-all                       |      |         |

    When I click on the "Next" page link
    Then the dataLayer should include the following events
      | event         | element_text | link_url                                                                                               | name                                                          | count | index | component      |
      | paginate_next | Next         | /victorian-skills-plan-2023-implementation-update/promoting-post-secondary-education-skills-and-career | Promoting post-secondary education skills and career pathways | 28    | 2     | rpl-page-links |

    When I click on the document "Print full document"
    Then the dataLayer should include the following events
      | event          | element_text        | link_url                                                    | component    |
      | print_document | Print full document | /victorian-skills-plan-2023-implementation-update/print-all | rpl-document |

  @mockserver
  Example: Publication print all
    Given the endpoint "/api/tide/publication-children" with query "?ids=100&ids=101&ids=102&ids=103&ids=104&ids=105&ids=106&ids=107&ids=108&ids=109&ids=110&ids=111&ids=112&ids=113&ids=114&ids=115&ids=116&ids=117&ids=118&ids=119&ids=120&ids=121&ids=122&ids=123&ids=124&ids=125&ids=126" returns fixture "/publication/sample-print-all" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index" with status 200
    When I visit the print all page "/victorian-skills-plan-2023-implementation-update/print-all"
    Then the dataLayer should include the following events
      | event       | page_title                                          |
      | routeChange | Print - Victorian Skills Plan Implementation Update |
    And the in page navigation should include
      | title                                                                     | url                                                                                                            |
      | The Victorian Skills Plan 2022 into 2023 actions and initiatives          | /victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives           |
      | Promoting post-secondary education skills and career pathways             | /victorian-skills-plan-2023-implementation-update/promoting-post-secondary-education-skills-and-career         |
      | Lifting participation in education and training                           | /victorian-skills-plan-2023-implementation-update/lifting-participation-education-and-training                 |
      | Delivering the right skills for the jobs of today and tomorrow            | /victorian-skills-plan-2023-implementation-update/delivering-right-skills-jobs-today-and-tomorrow              |
      | The Victorian Skills Plan supports action on skills                       | /victorian-skills-plan-2023-implementation-update/action-on-skills                                             |
      | Victorian Training Awards 2023 School-based Apprentice of the Year winner | /victorian-skills-plan-2023-implementation-update/victorian-training-awards-2023-school-based-apprentice       |
      | Start the VET journey at school                                           | /victorian-skills-plan-2023-implementation-update/start-vet-journey-school                                     |
      | Victorian Training Awards 2023 Koorie Student of the Year winner          | /victorian-skills-plan-2023-implementation-update/victorian-training-awards-2023-koorie-student-year-winner    |
      | Victorian Training Awards 2023 Koorie Student of the Year finalists       | /victorian-skills-plan-2023-implementation-update/victorian-training-awards-2023-koorie-student-year-finalists |
    And all content images should be "eager" loaded
    And the print dialog should be shown

  @mockserver
  Example: Hides print all button when node limit exceeded
    Given the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index-large" with status 200
    When I visit the page "/victorian-skills-plan-2023-implementation-update"
    Then the print document link should be hidden
