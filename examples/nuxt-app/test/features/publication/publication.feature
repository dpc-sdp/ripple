Feature: Publication page

  Example of mocked page

  Background:
    Given the page endpoint for path "/victorian-skills-plan-2023-implementation-update" returns fixture "/publication/sample-publication" with status 200
    And the page endpoint for path "/victorian-skills-plan-2023-implementation-update/2022-victorian-skills-plan-actions-and-initiatives" returns fixture "/publication/sample-publication-page" with status 200
    And the endpoint "/api/tide/publication-index" with query "?id=ecb799a1-a1a3-4989-89f6-1657f786e12e" returns fixture "/publication/sample-index" with status 200
    And the site endpoint returns fixture "/site/vic" with status 200

  @mockserver
  Example: Publication parent
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
    Given the page endpoint for path "/victorian-skills-plan-2023-implementation-update/promoting-post-secondary-education-skills-and-career" returns fixture "/publication/sample-publication-page" with status 200
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
    Given the endpoint "/api/tide/publication-children" with query "?ids=4a6d9877-326a-4090-8f7d-51c79191c63b&ids=7f608818-51e5-4c42-831a-a51d46a41ff6&ids=3479556d-7daa-4bc4-985a-d0ec1d954713&ids=a805aea1-6b50-4327-b176-ff4468775ad6&ids=c17daa15-9ad8-412d-a049-aa1ef6c668c2&ids=f85fab41-8217-44c4-bb0d-29ab5bc2832c&ids=c83e001c-2429-4c87-a53c-62a96ee426c6&ids=d51a4112-fd63-42cb-91a6-c17057c25242&ids=095e703d-e8cc-4153-9cf4-13e8a4f095c9&ids=ad3fd4c8-60dc-4c0d-a55c-5137766a2056&ids=64d7c641-640d-46e9-9967-7ad49104d744&ids=463ebde6-f906-427e-adaa-e2c7dba9f875&ids=3218f7fa-e189-44a2-8fdb-fc750409c421&ids=c0bf3b7f-1819-4cdb-99e8-4fd50071adac&ids=bf8208e7-bbc7-40cf-b3c0-111e6caabd91&ids=e0ce9cb4-df4f-4ae9-84e6-b1589486cdc8&ids=03b2d101-d6d8-4e55-a3e4-cad2d08f625b&ids=181e7b7e-ad44-4451-843a-044d760aa18e&ids=9c4656a6-3294-4515-8a7e-e15cd32841b6&ids=fadb534c-9598-40d0-a211-ca4b8a7c140a&ids=556bcf1a-46d6-4565-87e5-79e1b4b31cc5&ids=133ddcfa-b7f7-431c-bc85-f59ba8f44eac&ids=ff6440cc-7605-4ff1-b8a1-f25a5797549f&ids=f197320e-e9e3-46c8-b402-43ddd409599a&ids=e6cdf8c8-c19a-419b-9bb1-22a0938bba58&ids=cf1bfe5d-929e-44e2-a542-18d8b9fcd234&ids=16ef10ae-d3e4-4217-9508-eb4981336a3e" returns fixture "/publication/sample-print-all" with status 200
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
    And the print dialog should be shown
