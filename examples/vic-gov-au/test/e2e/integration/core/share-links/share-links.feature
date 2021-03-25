Feature: Share links

  As an authorized user I want to be able to share links to unauthorized users.

  Scenario: BE - Create draft page and share link
    Given I have logged into the backend
    And in the backend there is a node at "/1-fe-share-links-1" with "core/share-links/1-FE-share-links-1" data
    And in the backend there is a share link token at "/share_link/a483c5da-99e1-41a3-8335-2dbd2648be65/90911" with "core/share-links/1-FE-share-link-token-1" data

  Scenario: Vist a share link
    When I visit the page "/share_link/a483c5da-99e1-41a3-8335-2dbd2648be65/90911"
    Then the h1 should be "1-FE-share-links-1"
