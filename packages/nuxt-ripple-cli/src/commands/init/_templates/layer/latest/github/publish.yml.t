---
to: "<%= gitHubActions ? `.github/workflows/publish.yml` : null %>"
---
name: Publish package
author: SDP
description: Publishes the package to GitHub Package registry on GitHub release creation. See https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages#publishing-packages-to-github-packages.
on:
  release:
    types: [created]

jobs:
  Publish:
    needs:
      - Build-test
      - Integration
    runs-on: ubuntu-latest
    permissions:
      packages: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm config set @dpc-sdp:https://npm.pkg.github.com/ && npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
