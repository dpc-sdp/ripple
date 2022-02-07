---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/definition.yaml
---

type: object
title: Tide <%= name %> content type
description: 'Tide mappings for <%= name %> content type'
required:
  - title
allOf:
  - $ref: '#/components/schemas/TidePage'
properties:
  type:
    type: string
    enum:
      - <%= name %>
  title:
    type: string
    title: Title
    description: Title of page
    example: Find, connect, shape your Victorian Government