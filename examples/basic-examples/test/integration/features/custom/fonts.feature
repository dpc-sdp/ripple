Feature: Custom font support

  As a developer I can use custom fonts other than the default Vic font
      
  Scenario: Custom fonts are used in theme
    Given I visit the page "/"
    Then the h1 heading should have the fonts "Oswald, Arial, Helvetica, sans-serif"
