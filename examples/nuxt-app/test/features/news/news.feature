Feature: News page

  Background:
    Given the page endpoint for path "/sample-news" returns fixture "/news/sample-news" with status 200

  @mockserver
  Scenario: On load
    Given the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/sample-news"
    Then the title should be "Sample News"

  @mockserver
  Scenario: Details
    Given the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/sample-news"
    And the news page details should include "Published:" "Friday, 11 November 2022 at 12:11 pm"
    And the news page details should include "Location:" "Melbourne metropolitan, Eastern metropolitan Melbourne"
    And the news page details should include "Department:" "DPC"

  @mockserver
  Scenario: Body
    Given the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/sample-news"
    And the news page should display the featured image "Image of tram"
    And the news page featured image aspect ratio is "wide"
    And a wysiwyg content area with ID "969" should exist with the content "Here is some sample rich text content"

  @mockserver
  Scenario: Feature flags can disable the detail labels
    Given the site endpoint returns fixture "/news/feature-flags" with status 200
    When I visit the page "/sample-news"
    Then the news page details should display only the description for "Published:" "Friday, 11 November 2022 at 12:11 pm"
    Then the news page details should display only the description for "Location:" "Melbourne metropolitan, Eastern metropolitan Melbourne"
    Then the news page details should display only the description for "Department:" "DPC"

  @mockserver
  Scenario: Feature flags can set the feature image aspect ratio
    Given the site endpoint returns fixture "/news/feature-flags" with status 200
    When I visit the page "/sample-news"
    Then the news page featured image aspect ratio is "square"
