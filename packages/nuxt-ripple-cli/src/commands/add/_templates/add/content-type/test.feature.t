---
to: "<%= locals.createTests ? `${cypressPath}/e2e/${h.changeCase.kebabCase(name)}/${h.changeCase.kebabCase(name)}.feature` : null %>"
---

Feature: <%= name %> page

  Background:
    Given the page endpoint for path "/sample-<%= h.changeCase.kebabCase(name) %>" returns fixture "/<%= h.changeCase.kebabCase(name) %>/sample-<%= h.changeCase.kebabCase(name) %>" with status 200
    And the site endpoint returns fixture "/site/reference" with status 200
    When I visit the page "/sample-<%= h.changeCase.kebabCase(name) %>"

  @mockserver
  Scenario: On load
    Then the title should be "Sample <%= name %>"
