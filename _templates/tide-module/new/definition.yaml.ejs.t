---
to: packages/<%= name %>/definition.yaml
---

type: object
title: <%= contentType %>
description: <%= description %>
required:
  - title
  - summary
  - bodyComponents
  - headerComponents
allOf:
  - $ref: '#/components/schemas/TidePage'
properties:
  type:
    type: string
    enum:
      - landing_page
  title:
    type: string
    title: Title
    description: Title of page
    example: Find, connect, shape your Victorian Government
  summary:
    type: string
    title: Summary
    description: Short description of the content of the page. Limited to 200 chars.
    example: "Access grants and services, find out what’s on in Victoria and have your say on government decisions."
  bodyComponents:
    title: Body Components
    type: array
    description: Landing page components
    allOf:
      - $ref: '#/components/schemas/landingPageComponent'
  headerComponents:
    type: array
    title:  Header Components
    description: Configurable Header components
    allOf:
      - $ref: '#/components/schemas/landingPageComponent'