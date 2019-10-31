Feature: Search (Site search)

  As a citizen I want to be able to search the site for information I want by keyword

  Scenario: Test search page loads SSR
    Given I am using a "macbook-15" device
    When I visit the page "/search"
    Then the current page should not be an error page

  Scenario: Global site search from header desktop
    Given I have mocked the search request with fixture "search/sitesearch" and params "from=0&size=10&filter_path=hits.hits,hits.total,aggregations&_source=changed,created,field_landing_page_summary,field_node_primary_site,field_page_intro_text,field_tags_name,field_topic_name,summary_processed,title,type,url"
    Given I have mocked the search request with fixture "search/sitesearch-filters" and params "size=0"
    Given I am using a "macbook-15" device
    When I visit the page "/"
    Then the search button in the site header should exist
    Then the search button in the site header should have the text "Search website"
    When I scroll to the "top" of the page
    And I click the search button in the site header
    Then the site search box should be visible
    Then the site search box should have the placeholder "Start typing..."
    When I type "victoria" into the site search input and hit enter
    Then I should be on the page "/search?q=victoria"
    And the current page should not be an error page
    Then there should be "10 of 577" search results
    And there should be the following search results:
      | title                              | url                              | date         | description                                                                                                                                                                                        |
      | About Women Victoria               | /about-women-victoria            | Sep 19, 2019 | Women Victoria aims to change attitudes and promote gender equality, prevent family violence and increase the number women in leadership.                                                          |
      | Industrial Relations Victoria      | /industrial-relations-victoria   | Sep 17, 2019 | Industrial Relations Victoria works towards achieving a positive working environment for all Victorians.                                                                                           |
      | NDIS providers in Victoria         | /ndis-providers-victoria         | Jul 22, 2019 | Information and resources for disability service providers, including how to register and your obligations around quality and safeguards.                                                          |
      | About Australia Day Victoria       | /about-australia-day-victoria    | Apr 29, 2019 | In Victoria, we celebrate Australia Day with a large program of events and activities.                                                                                                             |
      | Family Safety Victoria established | /family-safety-victoria-launched | Sep 4, 2019  | |
      | Renting in Victoria                | /renting-victoria                | Jul 31, 2019 | Support and advice for renters, information for property managers and changes to renting laws.                                                                                                     |
      | Polocrosse Victoria Tournament     | /polocrosse-victoria-tournament  | Sep 13, 2019 | |
      | Brand Victoria Guidelines          | /brand-victoria-guidelines       | May 15, 2019 | The Brand Victoria Guidelines must be used for all Victorian Government communications and advertising. Covers logos, fonts, colour and other elements.                                            |
      | Family Safety Victoria             | /family-safety-victoria          | Oct 17, 2019 | Family Safety Victoria was established in July 2017 to drive key elements of Victoria’s family violence strategy and coordinate support for families to help them care for children and young people.|
      | Wage Inspectorate Victoria         | /wage-inspectorate-victoria      | Sep 19, 2019 | The Victorian Wage Inspectorate provides practical advice, information and support to Victorian employees and employers about state-specific laws, their work rights and responsibilities.          |
    And the pagination component should exist
    And the pagination component should have 5 steps
    And page 1 should be active in the pagination component

  Scenario: Global site search from header mobile
    Given I am using a "iphone-6+" device
    When I visit the page "/"
    Then the search button in the site header should exist
    And the search button text in the site header should not be visible
