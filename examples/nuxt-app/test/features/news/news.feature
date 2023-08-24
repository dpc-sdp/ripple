Feature: News page

  Background:
    Given the page endpoint for path "/sample-news" returns fixture "/news/sample-news" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/sample-news"

  @mockserver
  Scenario: On load
    Then the title should be "Sample News"

  @mockserver
  Scenario: Details
    And the news page details should include "Melbourne metropolitan, Eastern metropolitan Melbourne"
    And the news page details should include "DPC"

  @mockserver
  Scenario: Body
    And the news page should display the featured image "Image of tram"
    And a wysiwyg content area with ID "969" should exist with the content "Here is some sample rich text content"
